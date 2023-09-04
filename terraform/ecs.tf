data "aws_iam_policy_document" "ecs_task_execution_role" {
  version = "2008-10-17"
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

data "aws_iam_policy" "AmazonEC2ContainerServiceforEC2Role" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

data "aws_iam_policy" "AmazonECSTaskExecutionRolePolicy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "secrets_manager_read_all" {
  version = "2012-10-17"
  statement {

    actions = [
      "secretsmanager:DescribeSecret",
      "secretsmanager:GetRandomPassword",
      "secretsmanager:GetResourcePolicy",
      "secretsmanager:GetSecretValue",
      "secretsmanager:ListSecretVersionIds",
      "secretsmanager:ListSecrets",
    ]

    resources = ["arn:aws:secretsmanager:${var.region}:${local.ACCOUNT_ID}:secret:${var.secrets_manager_name}/*"]
  }
}

resource "aws_iam_policy" "secrets_manager_read" {
  name   = "${var.service_name}-SecretsManagerReadPolicy"
  policy = data.aws_iam_policy_document.secrets_manager_read_all.json
}

data "aws_iam_policy_document" "private_registry_authentication" {
  version = "2012-10-17"
  statement {
    sid       = ""
    effect    = "Allow"
    actions   = ["kms:Decrypt"]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "private_registry_authentication" {
  name   = "${var.service_name}-PrivateRegistryAuthenticationPolicy"
  policy = data.aws_iam_policy_document.private_registry_authentication.json
}

data "aws_iam_policy_document" "sns_publish" {
  version = "2012-10-17"
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sns:Publish"]

    resources = ["*"]
  }
}

resource "aws_iam_policy" "sns_publish" {
  name   = "${var.service_name}-SNSPublishPolicy"
  policy = data.aws_iam_policy_document.sns_publish.json
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name                = "${var.service_name}-ecsTaskExecutionRole"
  assume_role_policy  = data.aws_iam_policy_document.ecs_task_execution_role.json
  managed_policy_arns = [
    data.aws_iam_policy.AmazonEC2ContainerServiceforEC2Role.arn,
    data.aws_iam_policy.AmazonECSTaskExecutionRolePolicy.arn,
    aws_iam_policy.secrets_manager_read.arn,
    aws_iam_policy.private_registry_authentication.arn,
    aws_iam_policy.sns_publish.arn,
  ]
}

resource "aws_security_group" "ecs" {
  name   = "${var.service_name}-ecs-sg"
  vpc_id = aws_vpc.this.id

  ingress {
    description = "ecs-port"
    from_port   = var.container_port
    to_port     = var.container_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "ecs-egress-all"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_ecs_cluster" "this" {
  name = "${var.service_name}-cluster"

  configuration {
    execute_command_configuration {
      logging = "DEFAULT"
    }
  }
}

resource "aws_ecs_task_definition" "this" {
  family                   = "${var.service_name}-task"
  network_mode             = "awsvpc"
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory

  container_definitions = <<TASK_DEFINITION
[
    {
      "name": "${var.service_name}-container",
      "image": "${local.ACCOUNT_ID}.dkr.ecr.${var.region}.amazonaws.com/${var.service_name}:latest",
      "portMappings": [
        {
          "containerPort": ${var.container_port},
          "hostPort": ${var.container_port},
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "entryPoint": [],
      "command": [],
      "environment": [],
      "mountPoints": [],
      "volumesFrom": [],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${var.service_name}-task",
          "awslogs-region": "${var.region}",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
TASK_DEFINITION
}


resource "aws_ecs_service" "this" {
  name            = "${var.service_name}-service"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.this.arn
  desired_count   = 1

  health_check_grace_period_seconds = 10

  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    base              = 0
    weight            = 1
  }

  deployment_controller {
    type = "ECS"
  }

  network_configuration {
    security_groups  = [aws_security_group.ecs.id]
    subnets          = concat(
      [for s in values(aws_subnet.privates) : s.id],
    )
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.this.arn
    container_name   = "${var.service_name}-container"
    container_port   = var.container_port
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  timeouts {}

  lifecycle {
    ignore_changes = [
      task_definition,
    ]
  }
}

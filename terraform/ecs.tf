data "aws_iam_policy_document" "ecs_instance_role" {
  version = "2008-10-17"
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
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


resource "aws_iam_role" "ecs_instance_role" {
  name                = "${var.service_name}-ecsInstanceRole"
  assume_role_policy  = data.aws_iam_policy_document.ecs_instance_role.json
  managed_policy_arns = [
    data.aws_iam_policy.AmazonEC2ContainerServiceforEC2Role.arn,
    data.aws_iam_policy.AmazonECSTaskExecutionRolePolicy.arn,
    aws_iam_policy.secrets_manager_read.arn,
    aws_iam_policy.private_registry_authentication.arn,
    aws_iam_policy.sns_publish.arn,
  ]
}










resource "aws_ecs_task_definition" "this" {
  family                   = "${var.service_name}-task"
  network_mode             = "awsvpc"
  task_role_arn            = aws_iam_role.ecs_instance_role.arn
  execution_role_arn       = aws_iam_role.ecs_instance_role.arn
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


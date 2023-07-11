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
  name   = "${var.service_name}-SecretsManagerRead"
  policy = data.aws_iam_policy_document.secrets_manager_read_all.json
}


resource "aws_iam_role" "ecs_instance_role" {
  name                = "${var.service_name}-ecsInstanceRole"
  assume_role_policy  = data.aws_iam_policy_document.ecs_instance_role.json
  managed_policy_arns = [
    data.aws_iam_policy.AmazonEC2ContainerServiceforEC2Role.arn,
    data.aws_iam_policy.AmazonECSTaskExecutionRolePolicy.arn,
    aws_iam_policy.secrets_manager_read.arn,
  ]
}












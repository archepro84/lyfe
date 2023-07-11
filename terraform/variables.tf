locals {
  ACCOUNT_ID = data.aws_caller_identity.current.account_id
}

data "aws_caller_identity" "current" {}


variable "region" {
  description = "AWS Region"
  default     = "ap-northeast-2"
  type        = string
}

variable "service_name" {
  description = "Service Name"
  type        = string
}

variable "secrets_manager_name" {
  description = "Secrets Manager Name"
  type        = string
}
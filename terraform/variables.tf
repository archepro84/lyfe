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

variable "container_port" {
  description = "ECS Container Port"
  type        = number
  default     = 3000
}

variable "container_cpu" {
  description = "ECS Container CPU"
  type        = number
  default     = 256
}

variable "container_memory" {
  description = "ECS Container Memory"
  type        = number
  default     = 512
}
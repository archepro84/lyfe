terraform {
  required_version = "~> 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  # FIXME: Cloud 도입
  #  cloud {
  #    hostname = "app.terraform.io"
  #    organization = "lyfe"
  #
  #    workspaces {
  #      name = "lyfe-terraform"
  #    }
  #  }
}

provider "aws" {
  region = var.region
}
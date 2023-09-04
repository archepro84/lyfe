terraform {
  required_version = "~> 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
    template = {
      source  = "hashicorp/template"
      version = "~> 1.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# https://registry.terraform.io/providers/hashicorp/template/2.2.0
provider "template" {
}
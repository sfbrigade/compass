terraform {
  # TODO(amantri): setup s3 bucket for state management.
  # https://dev.to/thnery/create-an-aws-ecs-cluster-using-terraform-g80#terraform-initial-configuration
  # https://courses.devopsdirective.com/terraform-beginner-to-pro/lessons/03-basic-terraform-usage/04-terraform-remote-backends#bootstrapping-process-for-aws-s3-backend

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.67"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_user
}

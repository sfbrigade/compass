# Creates and manages the AWS resources needed for Compass.
#
# Also creates the following resources for the Terraform backend configuration:
#  s3 bucket for state backup: "${var.app_name}-${var.app_environment}-tf-state"
#  DynamoDB for locking      : "${var.app_name}-${var.app_environment}-tf-state-locking"

terraform {
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

resource "aws_s3_bucket" "terraform_state" {
  bucket        = "${var.app_name}-${var.app_environment}-tf-state"
  force_destroy = true

  tags = {
    Name        = "${var.app_name}-${var.app_environment}-s3"
    Environment = var.app_environment
  }
}

resource "aws_s3_bucket_versioning" "terraform_bucket_versioning" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_crypto_conf" {
  bucket = aws_s3_bucket.terraform_state.bucket
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "${var.app_name}-${var.app_environment}-tf-state-locking"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "${var.app_name}-${var.app_environment}-dynamodb"
    Environment = var.app_environment
  }
}
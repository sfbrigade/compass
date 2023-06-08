resource "aws_s3_bucket" "env" {
  bucket = "${var.app_name}-env"

  tags = {
    Name        = "${var.app_name}-${var.app_environment}-s3"
    Environment = var.app_environment
  }
}

resource "aws_s3_bucket_versioning" "env_versioning" {
  bucket = aws_s3_bucket.env.id
  versioning_configuration {
    status = "Enabled"
  }
}

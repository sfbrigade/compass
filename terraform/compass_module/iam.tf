resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "${var.app_name}-${var.app_environment}-execution-task-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
  tags = {
    Name        = "${var.app_name}-${var.app_environment}-iam-role"
    Environment = var.app_environment
  }
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "s3_env_policy" {
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.env.arn}/*"]
  }
  statement {
    effect    = "Allow"
    actions   = ["s3:GetBucketLocation"]
    resources = [aws_s3_bucket.env.arn]
  }
}

resource "aws_iam_policy" "s3_env_policy" {
  name        = "${var.app_name}-${var.app_environment}-s3-policy"
  description = "Allow access to files on s3"
  policy      = data.aws_iam_policy_document.s3_env_policy.json
}

resource "aws_iam_role_policy_attachment" "s3_env_policy_attachment" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = aws_iam_policy.s3_env_policy.arn
}

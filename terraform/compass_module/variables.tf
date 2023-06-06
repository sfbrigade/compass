variable "app_name" {
  description = "Name of the deployed app, e.g. compass-prod or compass-staging"
  type        = string
}

variable "app_environment" {
  description = "Deployment environment for the app, e.g. prod or staging"
  type        = string
}

variable "aws_user" {
  type        = string
  description = "AWS user to manage resources"
}

variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones"
}

variable "cidr_block" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "List of public subnets"
  default     = ["10.0.100.0/24", "10.0.101.0/24"]
}

variable "private_subnets" {
  description = "List of private subnets"
  default     = ["10.0.0.0/24", "10.0.1.0/24"]
}

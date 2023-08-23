# Google Cloud project slug
variable "project_id" {
  type = string
}

# Region to deploy to
variable "region" {
  type    = string
  default = "us-west1"
}

# Image to deploy
variable "image" {
  type = string
}

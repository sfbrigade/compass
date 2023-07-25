# Google Cloud project slug
variable "project" {
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

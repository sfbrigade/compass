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

# OAuth client ID
variable "oauth_client_id" {
  type = string
}

# OAuth client secret
variable "oauth_client_secret" {
  type = string
}

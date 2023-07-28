# Google Cloud region
variable "region" {
  type    = string
  default = "us-west1"
}

# Google Cloud project slug
variable "project_id" {
  type = string
}

# GitHub repo slug
variable "github_repo" {
  type    = string
  default = "sfbrigade/compass"
}

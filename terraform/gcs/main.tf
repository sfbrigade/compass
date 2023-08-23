terraform {
  required_version = ">= 1.3"

  required_providers {
    google = ">= 3.3"
  }

  backend "gcs" {}
}

provider "google" {
  project = var.project_id
}

data "google_project" "project" {}

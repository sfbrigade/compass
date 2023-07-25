terraform {
  required_version = ">= 1.3"

  required_providers {
    google = ">= 3.3"
  }

  backend "gcs" {
    prefix = "compass/staging"
  }
}

provider "google" {
  project = var.project
}

data "google_project" "project" {}

terraform {
  required_version = ">= 1.3"

  required_providers {
    google = ">= 3.3"
  }
}

provider "google" {
  project = var.project
}

# Enable Cloud Storage API
resource "google_project_service" "storage_service" {
  service = "storage.googleapis.com"
}

# Enable Artifact Registry API
resource "google_project_service" "artifact_registry" {
  service = "artifactregistry.googleapis.com"
}

# Bucket name must be globally unique
resource "random_id" "bucket_prefix" {
  byte_length = 8
}

# Create state bucket
resource "google_storage_bucket" "default" {
  name          = "${random_id.bucket_prefix.hex}-bucket-tfstate"
  location      = "US"
  storage_class = "STANDARD"

  public_access_prevention    = "enforced"
  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }
}

output "state_bucket_name" {
  value = google_storage_bucket.default.name
}

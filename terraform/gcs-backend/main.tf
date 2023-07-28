terraform {
  required_version = ">= 1.3"

  required_providers {
    google = ">= 3.3"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Enable Cloud Storage API
resource "google_project_service" "storage_service" {
  service = "storage.googleapis.com"
}

# Enable Artifact Registry API
resource "google_project_service" "artifact_registry" {
  service = "artifactregistry.googleapis.com"
}

# Enable IAM SA Credentials API
resource "google_project_service" "iam_credentials" {
  service = "iamcredentials.googleapis.com"
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

# Create necessary resources for authenticating to GCP via GitHub Actions tokens
resource "google_service_account" "github_ci" {
  account_id   = "github-ci"
  display_name = "GitHub CI"
}

# Allow GitHub CI to write to Artifact Registry
resource "google_project_iam_member" "github_ci_artifacts" {
  project = var.project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.github_ci.email}"
}

module "gh_oidc" {
  source      = "terraform-google-modules/github-actions-runners/google//modules/gh-oidc"
  project_id  = var.project_id
  pool_id     = "compass-ci-pool"
  provider_id = "gh-provider"
  sa_mapping = {
    (google_service_account.github_ci.account_id) = {
      sa_name   = google_service_account.github_ci.name
      attribute = "attribute.repository/${var.github_repo}"
    }
  }
}

output "github_ci_workload_identity_provider" {
  value = module.gh_oidc.provider_name
}

output "github_ci_sevice_account_email" {
  value = google_service_account.github_ci.email
}

# Create Artifact Registry for GitHub CI to push images to
resource "google_artifact_registry_repository" "repo" {
  repository_id = "compass"
  format        = "DOCKER"
}

output "artifact_registry_repository" {
  value = google_artifact_registry_repository.repo.name
}

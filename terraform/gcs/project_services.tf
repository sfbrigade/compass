# Enable Secret Manager API
resource "google_project_service" "secretmanager_api" {
  service = "secretmanager.googleapis.com"
}

# Enable SQL Admin API
resource "google_project_service" "sqladmin_api" {
  service = "sqladmin.googleapis.com"
}

# Enable Cloud Run API
resource "google_project_service" "cloud_run_service" {
  service = "run.googleapis.com"
}

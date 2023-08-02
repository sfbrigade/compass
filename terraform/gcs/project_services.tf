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

# Enable Cloud Resource Manager API (needed when deploying from CI but not when deploying locally...)
resource "google_project_service" "cloud_resource_manager_api" {
  project = var.project_id
  service = "cloudresourcemanager.googleapis.com"
}

# Wait for Cloud Resource Manager API to be enabled
resource "time_sleep" "gcp_wait_crm_api_enabling" {
  depends_on = [
    google_project_service.cloud_resource_manager_api
  ]

  create_duration = "1m"
}

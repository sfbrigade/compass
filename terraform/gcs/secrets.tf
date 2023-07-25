# Random value used for NextAuth secret
resource "random_password" "nextauth_secret" {
  length           = 32
  special          = true
  override_special = "_%@"
}

resource "google_secret_manager_secret" "nextauth_secret" {
  secret_id = "nextauth_secret"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager_api]
}

resource "google_secret_manager_secret_version" "nextauth_secret_data" {
  secret      = google_secret_manager_secret.nextauth_secret.name
  secret_data = random_password.nextauth_secret.result
}

resource "google_secret_manager_secret_iam_member" "nextauth_secret_access" {
  secret_id  = google_secret_manager_secret.nextauth_secret.id
  role       = "roles/secretmanager.secretAccessor"
  member     = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.nextauth_secret]
}

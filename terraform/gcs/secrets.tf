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

# OAuth client ID
resource "google_secret_manager_secret" "oauth_client_id" {
  secret_id = "oauth_client_id"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager_api]
}

resource "google_secret_manager_secret_version" "oauth_client_id_data" {
  secret      = google_secret_manager_secret.oauth_client_id.name
  secret_data = var.oauth_client_id
}

resource "google_secret_manager_secret_iam_member" "oauth_client_id_access" {
  secret_id  = google_secret_manager_secret.oauth_client_id.id
  role       = "roles/secretmanager.secretAccessor"
  member     = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.oauth_client_id]
}

# OAuth client secret
resource "google_secret_manager_secret" "oauth_client_secret" {
  secret_id = "oauth_client_secret"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager_api]
}

resource "google_secret_manager_secret_version" "oauth_client_secret_data" {
  secret      = google_secret_manager_secret.oauth_client_secret.name
  secret_data = var.oauth_client_secret
}

resource "google_secret_manager_secret_iam_member" "oauth_client_secret_access" {
  secret_id  = google_secret_manager_secret.oauth_client_secret.id
  role       = "roles/secretmanager.secretAccessor"
  member     = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.oauth_client_secret]
}

# Cloud Storage access ID
resource "google_secret_manager_secret" "storage_access_key" {
  secret_id = "storage_access_key"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager_api]
}

resource "google_secret_manager_secret_version" "storage_access_key_data" {
  secret      = google_secret_manager_secret.storage_access_key.name
  secret_data = google_storage_hmac_key.compass_data_key.access_id
}

resource "google_secret_manager_secret_iam_member" "storage_access_key_access" {
  secret_id  = google_secret_manager_secret.storage_access_key.id
  role       = "roles/secretmanager.secretAccessor"
  member     = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.storage_access_key]
}

# Cloud Storage access key
resource "google_secret_manager_secret" "storage_secret_key" {
  secret_id = "storage_secret_key"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager_api]
}

resource "google_secret_manager_secret_version" "storage_secret_key_data" {
  secret      = google_secret_manager_secret.storage_secret_key.name
  secret_data = google_storage_hmac_key.compass_data_key.secret
}

resource "google_secret_manager_secret_iam_member" "storage_secret_key_access" {
  secret_id  = google_secret_manager_secret.storage_secret_key.id
  role       = "roles/secretmanager.secretAccessor"
  member     = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.storage_secret_key]
}

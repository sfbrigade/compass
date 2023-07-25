# Create SQL instance
resource "google_sql_database_instance" "postgres_instance" {
  name             = "postgres-instance"
  region           = "us-west1"
  database_version = "POSTGRES_15"

  settings {
    tier = "db-f1-micro"
  }

  # todo: set `deletion_protection` depending on the environment

  depends_on = [google_project_service.sqladmin_api]
}

# Generate database password
resource "random_password" "database_password" {
  length           = 32
  special          = true
  override_special = "_%@"
}

# Store database password as a secret
resource "google_secret_manager_secret" "postgres_password" {
  secret_id = "postgres-password"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager_api]
}

resource "google_secret_manager_secret_version" "postgres_password_data" {
  secret      = google_secret_manager_secret.postgres_password.id
  secret_data = random_password.database_password.result
}

# Create database on Postgres instance
resource "google_sql_database" "database" {
  name     = "compass"
  instance = google_sql_database_instance.postgres_instance.name
}

# Create database user on Postgres instance
resource "google_sql_user" "database_user" {
  name     = "application"
  instance = google_sql_database_instance.postgres_instance.name
  password = random_password.database_password.result
}

# Store database URL as secret (assumes that Cloud SQL is mounted as a Unix socket)
resource "google_secret_manager_secret" "database_url" {
  secret_id = "database_url"

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager_api]
}

resource "google_secret_manager_secret_version" "database_url_data" {
  secret      = google_secret_manager_secret.database_url.name
  secret_data = "postgres://${google_sql_user.database_user.name}:${random_password.database_password.result}@/${google_sql_database.database.name}?host=/cloudsql/${google_sql_database_instance.postgres_instance.connection_name}"
}

resource "google_secret_manager_secret_iam_member" "database_url_access" {
  secret_id  = google_secret_manager_secret.database_url.id
  role       = "roles/secretmanager.secretAccessor"
  member     = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
  depends_on = [google_secret_manager_secret.database_url]
}

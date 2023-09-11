# Our container
resource "google_cloud_run_v2_service" "run_service" {
  name     = "compass"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = var.image

      ports {
        container_port = 3000
      }

      env {
        name = "DATABASE_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.database_url.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "NEXTAUTH_SECRET"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.nextauth_secret.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "GOOGLE_CLIENT_ID"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.oauth_client_id.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "GOOGLE_CLIENT_SECRET"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.oauth_client_secret.secret_id
            version = "latest"
          }
        }
      }

      env {
        name  = "S3_USER_UPLOADS_ENDPOINT"
        value = "https://storage.googleapis.com"
      }

      env {
        name  = "S3_USER_UPLOADS_REGION"
        value = var.region
      }

      env {
        name = "S3_USER_UPLOADS_ACCESS_KEY_ID"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.storage_access_key.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "S3_USER_UPLOADS_SECRET_ACCESS_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.storage_secret_key.secret_id
            version = "latest"
          }
        }
      }

      env {
        name  = "S3_USER_UPLOADS_BUCKET_NAME"
        value = google_storage_bucket.compass_data.name
      }

      env {
        name  = "NEXTAUTH_URL"
        value = var.base_http_endpoint
      }

      env {
        name  = "BASE_HTTP_ENDPOINT"
        value = var.base_http_endpoint
      }

      startup_probe {
        period_seconds    = 1
        failure_threshold = 30

        tcp_socket {
          port = 3000
        }
      }

      resources {
        startup_cpu_boost = true
      }
    }

    # Cloud SQL instance is connected via Unix socket
    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.postgres_instance.connection_name]
      }
    }
  }

  depends_on = [
    google_project_service.cloud_run_service,
    google_sql_database_instance.postgres_instance
  ]
}

# Allow public access
resource "google_cloud_run_service_iam_binding" "default" {
  location = google_cloud_run_v2_service.run_service.location
  service  = google_cloud_run_v2_service.run_service.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}

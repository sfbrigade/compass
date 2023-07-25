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

      startup_probe {
        tcp_socket {
          port = 3000
        }
      }

      liveness_probe {
        http_get {
          path = "/"
        }
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

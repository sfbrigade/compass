# Bucket name must be globally unique
resource "random_id" "bucket_prefix" {
  byte_length = 8
}

# For user-uploaded files
resource "google_storage_bucket" "compass_data" {
  name          = "compass-data-${random_id.bucket_prefix.hex}"
  location      = "US"
  storage_class = "STANDARD"

  uniform_bucket_level_access = true

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_hmac_key" "compass_data_key" {
  service_account_email = "${data.google_project.project.number}-compute@developer.gserviceaccount.com"
}

# Allow Cloud Run to read and write to the bucket
resource "google_storage_bucket_iam_member" "compass_data" {
  bucket = google_storage_bucket.compass_data.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"

  depends_on = [google_storage_bucket.compass_data]
}

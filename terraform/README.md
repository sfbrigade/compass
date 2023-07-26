# Terraform

## Initializing a new Google Cloud project

To initialize the Terraform backend (must be done once manually per Google Cloud project):

1. `cd terraform/gcs-backend`
2. `terraform init`
3. `terraform apply`

If this is for a local development environment, copy `backend.hcl` to `backend.dev.hcl` and update `bucket` with what is output from the `terraform apply` command.

Otherwise, update `backend.hcl` directly.

## Deploying

1. `cd terraform/gcs`
2. `terraform init -backend-config=../backend.dev.hcl` (you only need to run this once)
3. `terraform apply`

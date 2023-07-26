# Terraform

## Initializing a new Google Cloud project

To initialize the Terraform backend and necessary services (must be done once manually per Google Cloud project):

1. `cd terraform/gcs-backend`
2. `terraform init`
3. `terraform apply -var="project=<project-id>"`

### For a local development environment

Copy `backend.hcl` to `backend.dev.hcl` and update `bucket` with what is output from the `terraform apply` command.

### For a production deployment

Update `bucket` in `backend.hcl` with what is output from the `terraform apply` command and commit your changes.

Similarly, set or update the GitHub secrets `GCS_WORKLOAD_IDENTITY_PROVIDER` and `GCS_SERVICE_ACCOUNT_EMAIL` from the output of the `terraform apply` command.

## Manual deployment

1. `cd terraform/gcs`
2. `terraform init -backend-config=../backend.dev.hcl` (you only need to run this once)
3. `terraform apply -var="project=<project-id>" -var="image=<image-ref>`

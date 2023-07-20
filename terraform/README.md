# Terraform

## Initializing a new AWS account

To initialize the terraform backend (must be done once manually per AWS account):

1. `cd terraform/s3-backend`
2. `terraform init`
3. `terraform apply -var 'bucket_name=<terraform-state-bucket-name>' -var 'dynamodb_table=<lock-table-name>'` (substitute values for bucket_name and dynamodb_table)

If this is for a local development environment, copy `backend.hcl` to `backend.dev.hcl` and update `bucket` & `dynamodb_table` values with what you used above.

Otherwise, update `backend.hcl` directly.

## Deploying

1. `cd terraform/staging`
2. `terraform init -backend-config=../backend.dev.hcl` (you only need to run this once)
3. `terraform apply`

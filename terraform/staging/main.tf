module "compass" {
  source = "../compass_module"

  # Module input variables
  app_name        = "compass"
  app_environment = "staging"

  aws_user           = "terraform-user"
  aws_region         = "us-west-1"
  availability_zones = ["us-west-1b", "us-west-1c"]
}

module "compass" {
  source = "../compass_module"

  # Module input variables
  app_name        = "compass"
  app_environment = "staging"

  aws_user           = "terraform-user"
  aws_region         = "us-west-2"
  availability_zones = ["us-west-2b", "us-west-2c"]
}

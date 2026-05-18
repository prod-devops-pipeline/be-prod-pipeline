resource "render_web_service" "backend" {
  name   = var.service_name
  region = "oregon"
  plan   = "free"

  runtime_source = {
    docker = {
      repo_url    = var.github_repo
      branch      = var.branch
      auto_deploy = true
    }
  }

  env_vars = {
     NODE_ENV = {
    value = "production"
  }

    PORT = {
      value = var.port
    }

    NODE_ENV = {
      value = "production"
    }

    DB_URL = {
      value = var.mongodb_uri
    }

    DATABASE_NAME = {
      value = var.database_name
    }

    JWT_SECREATE_KEY = {
      value = var.jwt_secret
    }

    JWT_EXPIRES_IN = {
      value = var.jwt_expires_in
    }

    JWT_TOKEN_NAME = {
      value = var.jwt_token_name
    }

    SALTROUNDS = {
      value = var.salt_rounds
    }
  }
}
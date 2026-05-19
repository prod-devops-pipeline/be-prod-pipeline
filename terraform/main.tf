resource "render_web_service" "backend" {
  name   = var.service_name
  region = "oregon"
  plan   = "free"

  # Deploy using a Docker image from Docker Hub
  # Example: yourdockerhubusername/securebackend:latest
  runtime_source = {
    image = {
      image_url = var.docker_image
    }
  }

  env_vars = {
    NODE_ENV = {
      value = "production"
    }

    PORT = {
      value = var.port
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
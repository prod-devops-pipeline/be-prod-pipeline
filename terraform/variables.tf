variable "render_api_key" {
  description = "Render API Key"
  type        = string
  sensitive   = true
}

variable "github_repo" {
  description = "GitHub repository URL"
  type        = string
}

variable "branch" {
  description = "Git branch to deploy"
  type        = string
  default     = "main"
}

variable "service_name" {
  description = "Render service name"
  type        = string
  default     = "securebackend"
}

variable "jwt_secret" {
  description = "JWT secret"
  type        = string
  sensitive   = true
}

variable "jwt_expires_in" {
  description = "JWT expiration time"
  type        = string
  default     = "7d"
}

variable "jwt_token_name" {
  description = "JWT cookie/token name"
  type        = string
  default     = "Authorization"
}

variable "salt_rounds" {
  description = "bcrypt salt rounds"
  type        = string
  default     = "10"
}

variable "port" {
  description = "Application port"
  type        = string
  default     = "3005"
}

variable "database_name" {
  description = "Application database name"
  type        = string
  default     = "akamai"
}

variable "mongodb_uri" {
  description = "MongoDB connection string"
  type        = string
  sensitive   = true
}

variable "render_owner_id" {
  type      = string
  sensitive = true
}

variable "docker_image" {
  description = "Docker image to deploy"
  type        = string
}
variable "docker_tag" {
  description = "Docker image tag"
  type        = string
}
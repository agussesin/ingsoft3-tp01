locals {
  image_tag = "sha-45300b62ba73a971ad382c9ed22ac96f0a3cceca"

  database_connection = "Host=${neon_project.preprod.database_host};Port=5432;Database=${neon_database.preprod.name};Username=${neon_role.preprod.name};Password=${neon_role.preprod.password};SSL Mode=Require"
}

resource "render_web_service" "api" {
  name   = "reservas-api-preprod"
  plan   = "free"
  region = "ohio"

  runtime_source = {
    image = {
      image_url = "ghcr.io/agussesin/ingsoft3-tp01-backend"
      tag       = local.image_tag
    }
  }

  env_vars = {
    ConnectionStrings__DefaultConnection = {
      value = local.database_connection
    }
  }

  health_check_path = "/health"
}

resource "render_web_service" "frontend" {
  name   = "reservas-front-preprod"
  plan   = "free"
  region = "ohio"

  runtime_source = {
    image = {
      image_url = "ghcr.io/agussesin/ingsoft3-tp01-frontend"
      tag       = local.image_tag
    }
  }

  env_vars = {
    BACKEND_URL = {
      value = trimsuffix(render_web_service.api.url, "/")
    }

    DNS_RESOLVER = {
      value = "8.8.8.8"
    }
  }
}
resource "neon_project" "preprod" {
  name                      = "reservas-preprod"
  org_id = "org-raspy-cake-12445798"
  region_id                 = "aws-us-east-2"
  history_retention_seconds = 21600
}

resource "neon_role" "preprod" {
  project_id = neon_project.preprod.id
  branch_id  = neon_project.preprod.default_branch_id
  name       = "reservas_preprod"
}

resource "neon_database" "preprod" {
  project_id = neon_project.preprod.id
  branch_id  = neon_project.preprod.default_branch_id
  name       = "reservas_preprod"
  owner_name = neon_role.preprod.name
}
terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}

provider "docker" {
  host = "npipe:////./pipe/docker_engine"
}

resource "docker_image" "nginx" {
  name = "nginx:latest"
}

resource "docker_container" "nginx1" {
  name  = "nginx1"
  image = docker_image.nginx.image_id
  ports {
    internal = 80
    external = 8081
  }
}

# resource "docker_container" "nginx2" {
#   name  = "nginx2"
#   image = docker_image.nginx.image_id
#   ports {
#     internal = 80
#     external = 8082
#   }
# }

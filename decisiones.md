# Decisiones tomadas - TP1 Ingeniería de Software III

## Protección de la rama main

Se configuró la rama `main` como rama protegida para evitar modificaciones directas y asegurar que los cambios sean incorporados mediante Pull Requests.

## Estrategia de ramas

Para realizar modificaciones se utilizaron ramas `feature`, manteniendo la rama `main` como versión estable del proyecto.

## Pull Requests

Los cambios realizados en las ramas fueron integrados a `main` mediante Pull Requests, utilizando la opción Squash and Merge.

## Resolución de conflictos

Se generó un conflicto de merge modificando la misma línea del archivo `README.md` desde dos ramas diferentes.

El conflicto fue resuelto manualmente desde GitHub, seleccionando el contenido correspondiente a la versión B antes de completar el merge.

## Versionado

Se utilizó versionado semántico para identificar una versión estable del trabajo. Se creó el tag `v1.0.0` y posteriormente se publicó como Release en GitHub.
## Decisiones del TP2 - Aplicacion de reservas

### Arquitectura

Se implemento una aplicacion full stack dividida en frontend, backend y base de datos. Esta separacion permite modificar, probar y contenerizar cada parte de manera independiente.

### Backend

Se utilizo ASP.NET Core con .NET 8 y controladores REST. Entity Framework Core actua como intermediario entre la aplicacion y PostgreSQL, mientras que Npgsql traduce las operaciones a instrucciones compatibles con PostgreSQL.

Las fechas se almacenan en UTC para evitar inconsistencias de zona horaria. El backend rechaza las reservas cuya fecha no sea futura, aunque el frontend tambien realice esa validacion.

### Frontend

Se eligieron React y Vite para construir una interfaz simple y responsive. La aplicacion permite listar, crear, editar y eliminar reservas.

La direccion de la API se expresa como una ruta relativa (`/api/reservas`). En desarrollo, Vite redirige esa ruta al backend. En Docker, Nginx realiza la misma funcion.

### Pruebas

Las pruebas del backend usan xUnit y una base de datos en memoria. De esta manera se verifica la logica sin depender de PostgreSQL ni de Docker.

Las pruebas del frontend usan Vitest y comprueban la conversion de fechas, la validacion de fechas futuras, la preparacion de datos y el texto singular o plural de personas.

### Contenedores

Se utilizaron Dockerfiles de varias etapas. La etapa inicial compila la aplicacion y la etapa final contiene solamente lo necesario para ejecutarla.

Docker Compose administra los tres servicios y sus dependencias. PostgreSQL utiliza un volumen para conservar los datos al detener los contenedores.

### Registro de imagenes

Las imagenes del frontend y del backend se publicaron en Docker Hub con la version `v0.1.0`. Tambien se creo un Compose alternativo que descarga esas imagenes, permitiendo ejecutar el sistema sin compilar el codigo local.

### Uso de asistencia de IA

La asistencia de IA se utilizo como guia para explicar conceptos, proponer comandos y revisar errores. Cada resultado se verifico mediante compilacion, lint, pruebas automatizadas y ejecucion real con Docker Compose.

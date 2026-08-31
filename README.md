# Sistema de gestión de reservas

Aplicación web full stack para gestionar próximas reservas. Permite crear, consultar, modificar y eliminar reservas, evitando registrar fechas pasadas.

## Tecnologías

- Frontend: React y Vite.
- Backend: ASP.NET Core Web API con .NET 8.
- Persistencia: PostgreSQL y Entity Framework Core.
- Pruebas: xUnit y Vitest.
- Contenedores: Docker, Docker Compose y Nginx.
- Registro de imágenes: Docker Hub.

## Arquitectura

El sistema está compuesto por tres servicios:

1. El frontend muestra la interfaz y envía solicitudes a `/api`.
2. Nginx sirve el frontend y redirige esas solicitudes al backend.
3. El backend procesa las operaciones y utiliza PostgreSQL para almacenar las reservas.

Puertos publicados:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- PostgreSQL: puerto interno `5432`

## Funcionalidades

- Listar próximas reservas.
- Consultar una reserva por identificador.
- Crear reservas.
- Editar reservas.
- Eliminar reservas.
- Validar los campos requeridos.
- Validar una cantidad de entre 1 y 20 personas.
- Rechazar reservas con fecha pasada.

## Ejecución con Docker Compose

Primero se debe crear el archivo local de variables:

```bash
cp .env.example .env
```

Luego se puede iniciar el sistema construyendo las imágenes desde el código fuente:

```bash
docker compose up -d --build
```

La aplicación queda disponible en:

```text
http://localhost:3000
```

Para consultar el estado de los servicios:

```bash
docker compose ps
```

Para detenerlos sin borrar los datos:

```bash
docker compose down
```

Para detenerlos y eliminar también la información almacenada en PostgreSQL:

```bash
docker compose down -v
```

## Ejecución desde Docker Hub

También se puede iniciar el sistema utilizando las imágenes publicadas:

```bash
docker compose -f docker-compose.registry.yml up -d
```

Imágenes utilizadas:

- `agussesin/reservas-frontend:v0.1.0`
- `agussesin/reservas-backend:v0.1.0`
- `postgres:16-alpine`

Para detener esta versión:

```bash
docker compose -f docker-compose.registry.yml down
```

## Pruebas del backend

```bash
dotnet test backend/ReservasApi.Tests/ReservasApi.Tests.csproj
```

Se implementaron cuatro pruebas automatizadas para verificar la creación, validación de fechas, actualización y eliminación de reservas.

## Pruebas y verificaciones del frontend

Ejecutar las cuatro pruebas unitarias:

```bash
npm test --prefix frontend
```

Comprobar la calidad del código:

```bash
npm run lint --prefix frontend
```

Generar la versión de producción:

```bash
npm run build --prefix frontend
```

## Endpoints principales

- `GET /health`
- `GET /api/reservas`
- `GET /api/reservas/{id}`
- `POST /api/reservas`
- `PUT /api/reservas/{id}`
- `DELETE /api/reservas/{id}`

## Persistencia

PostgreSQL utiliza el volumen `db_data`. Los datos permanecen guardados al ejecutar `docker compose down` y se eliminan únicamente cuando se agrega la opción `-v`.

El archivo `.env` contiene datos locales y está excluido de Git. `.env.example` documenta las variables necesarias sin publicar contraseñas reales.

## Evidencias

Las capturas de las actividades se encuentran en la carpeta `evidencias`. La imagen `registry-aplicacion-funcionando.png` demuestra que la aplicación levantada desde las imágenes publicadas permite crear y listar reservas.

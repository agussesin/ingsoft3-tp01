# Decisiones tomadas - TP1 Ingeniería de Software III

## Decisiones del TP1 - Git y trabajo colaborativo

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

### Por qué Git no resolvió el conflicto automáticamente

Git no pudo resolver el conflicto porque dos ramas modificaron de manera diferente la misma línea del mismo archivo. Git puede combinar automáticamente cambios realizados en líneas o zonas distintas, pero no puede decidir cuál de dos contenidos incompatibles representa la intención correcta.

El conflicto no habría aparecido si las ramas hubieran modificado partes diferentes del archivo, si una rama hubiese incorporado los cambios de `main` antes de editar esa línea o si el equipo hubiera coordinado previamente quién debía modificarla.

### Problemas encontrados y resolución

El push directo a `main` fue rechazado por la protección de rama, lo que confirmó que los cambios debían ingresar mediante Pull Request. También se produjo un conflicto intencional en `README.md`; se revisaron ambas versiones, se eligió el contenido correcto y luego se completó el merge.

### Uso de asistencia de IA

La asistencia de IA se utilizó para explicar comandos y conceptos de Git, orientar la creación de ramas, Pull Requests, tags y releases, y analizar el conflicto. Cada resultado se verificó observando el estado del repositorio, la protección de `main`, el historial de commits y la versión publicada en GitHub.


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


### Elección de la aplicación

Se eligió una aplicación de reservas porque cumple cuatro criterios: resuelve un caso de uso concreto y fácil de demostrar; permite realizar operaciones completas de alta, consulta, modificación y eliminación; requiere comunicación real entre frontend y backend; y necesita persistencia en una base de datos. Además, su alcance es suficientemente pequeño para contenerizarla y probarla de punta a punta.

### Comunicación entre servicios

Docker Compose crea una red interna y cada servicio puede localizar a los demás mediante su nombre. El backend se conecta a PostgreSQL usando `db` como host. El frontend sirve la aplicación con Nginx y redirige las solicitudes `/api` al backend, evitando que el navegador necesite conocer la dirección interna del contenedor.

### Healthcheck y dependencias

El `healthcheck` comprueba activamente si PostgreSQL está listo para aceptar conexiones. `depends_on` define el orden y la condición de inicio, pero por sí solo no demuestra que la aplicación dentro del contenedor esté preparada. Por eso el backend espera a que la base tenga estado `healthy`, mientras que el frontend depende del inicio del backend.

### Secretos y configuración

El archivo `.env.example` documenta las variables necesarias sin incluir valores sensibles. El archivo `.env` contiene la configuración local real, no se versiona porque está incluido en `.gitignore`, y Docker Compose utiliza esas variables al iniciar los servicios.

### Problemas encontrados y resolución

Fue necesario coordinar las rutas entre Vite, Nginx y el backend para que `/api/reservas` funcionara tanto en desarrollo como dentro de Docker. También se verificó que el volumen conservara los datos después de `docker compose down` y que `docker compose down -v` los eliminara intencionalmente. Finalmente, se creó un Compose separado para descargar las imágenes publicadas sin usar `build:`.


## Decisiones del TP3 - Planificación y trazabilidad

### Duración del sprint

Se eligió una duración de una semana para el sprint, alineada con el ritmo de entregas de la materia. Este período permite completar trabajo concreto, recibir retroalimentación rápidamente y ajustar la planificación sin esperar demasiado tiempo.

### Límite de trabajo en progreso

Se configuró un límite de dos elementos en la columna In Progress. Como el equipo está compuesto por una sola persona, se aplica la regla de cantidad de integrantes más uno. El segundo lugar permite continuar con otra tarea si la primera queda esperando una revisión o una respuesta, sin acumular demasiado trabajo abierto ni aumentar los cambios de contexto.

### Diagnóstico de la historia mal escrita

La frase "Como desarrollador quiero crear la tabla usuarios" es una tarea técnica disfrazada de historia, porque describe una implementación y no un valor observable para una persona usuaria. Se podría reescribir como: "Como usuario quiero registrarme en la aplicación para guardar y gestionar mis reservas".

### Problemas encontrados y resolución

La versión instalada de GitHub CLI no permitía crear campos de tipo Iteration, ya que el comando solamente admitía campos de texto, selección, fecha o número. El campo Sprint se creó desde la configuración web de GitHub Projects.

También fue necesario mostrar manualmente el campo Sprint en la vista de tabla para asignarlo a la historia y sus tareas. Se verificó la jerarquía mediante sub-issues, el límite WIP en el board y la automatización que mueve una tarea cerrada a Done.

### Uso de asistencia de IA

La asistencia de IA se utilizó para explicar los conceptos de épica, historia, tarea, bug, sprint, límite WIP, trazabilidad e integración continua; también para orientar los comandos y revisar la configuración.

Cada resultado fue verificado observando el Project público, la jerarquía navegable, la ejecución exitosa de GitHub Actions, el Pull Request mergeado, el cierre automático de la tarea número 8 y su movimiento a la columna Done.

## Decisiones del TP4 - Pipeline como código

### Estructura del pipeline

El workflow se ejecuta ante Pull Requests hacia `main` y pushes a `main`. Se separó en los jobs `build-backend` y `build-frontend` porque ambas imágenes tienen Dockerfiles y contextos independientes. Al no depender uno del otro, se ejecutan en paralelo para reducir el tiempo total y mostrar con claridad qué componente falla.

### Construcción mediante Dockerfiles

El pipeline construye las mismas imágenes definidas para la ejecución local. Esto evita duplicar en el workflow los comandos de compilación y mantiene los Dockerfiles como fuente única de verdad.

### Caché

Se utilizó la caché de GitHub Actions mediante Docker Buildx, con scopes separados para backend y frontend. La primera ejecución construye y guarda las capas; la segunda reutiliza esas capas y muestra `CACHED`. Si se elimina la caché, el pipeline sigue funcionando, aunque tarda más.

### Puerta de calidad

La rama `main` exige un Pull Request y los checks `build-backend` y `build-frontend` aprobados. También exige que la rama esté actualizada con `main`.

Esto se comprobó introduciendo un error controlado: falló la construcción del backend, el frontend continuó correctamente y el merge quedó bloqueado. Después de corregir el error, ambos checks aprobaron y el merge volvió a habilitarse.

### Problemas encontrados y resolución

Los checks requeridos solamente pudieron seleccionarse después de que el workflow se ejecutara al menos una vez. También se utilizó un Pull Request concurrente para comprobar que una rama desactualizada queda bloqueada hasta incorporar los últimos cambios de `main`.

### Uso de asistencia de IA

La asistencia de IA se utilizó para explicar los conceptos del pipeline, proponer comandos y revisar la configuración. Cada resultado fue verificado mediante corridas reales de GitHub Actions, la reutilización visible de la caché, un fallo controlado y la protección efectiva de la rama `main`.

# Decisiones tomadas - TP1 Ingeniería de Software III


## Enlaces del TP7

### Imágenes públicas

- [Paquete backend](https://github.com/users/agussesin/packages/container/package/ingsoft3-tp01-backend)
- [Paquete frontend](https://github.com/users/agussesin/packages/container/package/ingsoft3-tp01-frontend)

Referencias de la versión corregida, verificadas en los cuatro servicios de Render:

- `ghcr.io/agussesin/ingsoft3-tp01-backend:sha-d3ce7332403048ad3f359dac27fa862946938e67`
- `ghcr.io/agussesin/ingsoft3-tp01-frontend:sha-d3ce7332403048ad3f359dac27fa862946938e67`

Ambos paquetes se comprobaron mediante descarga sin credenciales al comenzar TP7, con la etiqueta `sha-335c51f863060edcd996d80a89f3492411e9cb26` y plataforma `linux/amd64`.

### Evidencia del gate: integración verde y E2E roja

- [Commit que cambió el botón de la aplicación, sin modificar las pruebas](https://github.com/agussesin/ingsoft3-tp01/commit/1c96b09)
- [Corrida roja: smoke verde, integración verde, E2E roja y PROD salteado](https://github.com/agussesin/ingsoft3-tp01/actions/runs/39620225388)
- [Reporte de integración: 3 pruebas aprobadas](https://github.com/agussesin/ingsoft3-tp01/actions/runs/39620225388/artifacts/12354443014)
- [Reporte E2E: 3 pruebas fallidas, con capturas y trazas](https://github.com/agussesin/ingsoft3-tp01/actions/runs/39620225388/artifacts/12356025128)

Los reportes se descargaron y revisaron. La traza mostró que el navegador esperaba “Guardar reserva”, mientras la aplicación mostraba “Confirmar reserva”. La API y la base seguían funcionando; el fallo estaba en la interfaz. PROD no solicitó aprobación ni recibió la imagen de la rotura.

### Corrección y promoción

- [PR del arreglo, con las pruebas intactas](https://github.com/agussesin/ingsoft3-tp01/pull/31)
- [Corrida posterior completamente verde, con aprobación y despliegue a PROD](https://github.com/agussesin/ingsoft3-tp01/actions/runs/39624631691)

En Render se verificó que API y frontend, en QA y PROD, ejecutaban la etiqueta `sha-d3ce7332403048ad3f359dac27fa862946938e67`, mediante Deploy Hook. Los registros de Render se mostrarán en vivo durante la defensa porque requieren acceso al panel.

### Entornos

- [QA: página de reservas](https://reservas-front-qa-h1ki.onrender.com/)
- [PROD: página de reservas](https://reservas-front-prod.onrender.com/)
- [API de QA](https://reservas-api-qa.onrender.com/api/reservas)
- [API de PROD](https://reservas-api-prod-zulr.onrender.com/api/reservas)

En los campos QA y PROD del formulario se informa únicamente la URL del frontend correspondiente. Los servicios deben mantenerse disponibles hasta la defensa y abrirse con anticipación por el arranque en frío del plan gratuito.


## Enlaces de este TP — TP6

### Imágenes públicas

Ambas imágenes se descargaron sin credenciales, después de ejecutar `docker logout ghcr.io`, usando `--platform linux/amd64`.

- [Paquete backend](https://github.com/users/agussesin/packages/container/package/ingsoft3-tp01-backend)
- [Paquete frontend](https://github.com/users/agussesin/packages/container/package/ingsoft3-tp01-frontend)

Referencias exactas comprobadas, correspondientes al merge del PR #24:

- `ghcr.io/agussesin/ingsoft3-tp01-backend:sha-8a30e5a55531dd3cb0da0ac47fd8580ac2e2faa2`
- `ghcr.io/agussesin/ingsoft3-tp01-frontend:sha-8a30e5a55531dd3cb0da0ac47fd8580ac2e2faa2`

### Cadena de verificación y publicación

- [CI #36: PR #26 con tests verdes y login al registry omitido](https://github.com/agussesin/ingsoft3-tp01/actions/runs/39534804917/job/119008869983?pr=26)
- [CI #37: job de main con construcción y publicación al final, después de los tests](https://github.com/agussesin/ingsoft3-tp01/actions/runs/39535144355/job/119020046592)
- [CI #35: promoción a PROD rechazada con motivo escrito](https://github.com/agussesin/ingsoft3-tp01/actions/runs/39532609532/job/119002246490)

### Entornos

- QA frontend: https://reservas-front-qa-h1ki.onrender.com/
- QA API: https://reservas-api-qa.onrender.com/api/reservas
- PROD frontend: https://reservas-front-prod.onrender.com/
- PROD API: https://reservas-api-prod-zulr.onrender.com/api/reservas

El environment de producción en GitHub se llama `prod`; representa el entorno denominado `production` en la consigna. Tiene aprobación manual, secretos propios y despliegues restringidos a `main`.

---

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

## Decisiones del TP5 - Testing y coverage

### Estrategia de pruebas

Se incorporaron pruebas unitarias tanto en backend como en frontend. El objetivo no fue únicamente aumentar la cantidad de tests, sino cubrir reglas de negocio y caminos de decisión relevantes.

En el backend se utilizaron xUnit y Entity Framework Core InMemory. Se alcanzaron 14 ejecuciones de tests, incluyendo casos válidos, casos de error, valores de borde, una prueba parametrizada y una prueba con mock.

En el frontend se utilizaron Vitest y funciones puras separadas de la interfaz. Se ejecutan 8 casos de prueba sobre normalización de reservas, fechas, cantidad de personas y acceso a la API.

Los tests siguen la estructura Arrange, Act y Assert para separar claramente la preparación de datos, la ejecución de la acción y la verificación del resultado.

### Separación de lógica de negocio

La validación de una reserva se extrajo a `ReservaValidator` en lugar de mantenerla mezclada dentro del controlador. Esto permite probar las reglas de negocio sin necesidad de levantar el servidor HTTP ni PostgreSQL.

Entre las reglas verificadas se encuentran nombre y lugar obligatorios, cantidad de personas entre 1 y 20, fecha futura y límite máximo de un año de anticipación.

Esta separación también permitió identificar ramas no cubiertas con mayor claridad mediante branch coverage.

### Mock del reloj

La validación de fechas dependía originalmente de la hora real del sistema. Esto hacía que una prueba pudiera depender del momento exacto en que se ejecutara.

Se creó la interfaz `IClock` y una implementación `SystemClock`. El controlador recibe el reloj mediante inyección de dependencias y utiliza `_clock.Now`.

En producción se inyecta `SystemClock`, mientras que en los tests se puede utilizar un reloj controlado o un mock. De esta forma las pruebas de fecha son deterministas.

Con Moq se verificó además que el controlador consulte el reloj una sola vez al crear una reserva.

### Mock en frontend

Para evitar que una prueba unitaria dependa de una llamada HTTP real, se separó la función encargada de cargar reservas desde la API.

`cargarReservasDesdeApi` recibe como dependencia la función que realiza la petición. En producción utiliza la implementación real y en el test se inyecta `vi.fn()`.

Esto permite verificar que se solicite `/api/reservas` sin realizar una llamada de red real. La aplicación `App.jsx` utiliza esa misma función, por lo que el código probado es parte del flujo real de la aplicación y no una función creada únicamente para el test.

### Métricas de coverage

Se utilizaron line coverage y branch coverage.

Line coverage indica qué proporción de líneas ejecutables fue recorrida por los tests. Branch coverage permite observar si se recorrieron los distintos caminos posibles de una decisión, por ejemplo las ramas verdaderas y falsas de un `if`.

Branch coverage se consideró especialmente importante porque es posible ejecutar una línea sin haber comprobado todos los caminos de decisión asociados.

Un porcentaje alto de coverage no garantiza por sí solo la calidad de los tests. Por ejemplo, un test podría ejecutar una función completa pero no realizar assertions útiles. Por eso el coverage se utiliza como señal complementaria y no como sustituto de pruebas correctamente diseñadas.

### Exclusiones del coverage del backend

Para calcular el quality gate del backend se excluyeron `Program`, `AppDbContext`, `Reserva` y `SystemClock`.

`Program` contiene principalmente configuración y arranque de la aplicación. `AppDbContext` representa infraestructura de acceso a datos. `Reserva` contiene principalmente propiedades y metadatos de validación. `SystemClock` es un adaptador mínimo sobre la hora del sistema.

El objetivo fue que el porcentaje utilizado por el gate represente principalmente código con comportamiento que pueda verificarse mediante pruebas unitarias, especialmente `ReservasController` y `ReservaValidator`.

Las exclusiones utilizadas para generar el reporte y para evaluar el threshold son las mismas, evitando mostrar una métrica diferente de la que realmente decide si el pipeline pasa o falla.

### Threshold del backend

Antes de elegir el threshold se midió el coverage real del proyecto.

Con las exclusiones definidas, el backend se encontraba ligeramente por encima del 70% tanto en line coverage como en branch coverage. Por ese motivo se eligió un threshold de 70% para ambas métricas.

El valor no se eligió como un porcentaje estándar, sino a partir del estado real del proyecto. El objetivo es impedir regresiones de cobertura sin exigir inicialmente un porcentaje artificialmente superior al nivel que el proyecto puede sostener.

El threshold puede incrementarse progresivamente en futuras iteraciones a medida que aumenta la cobertura del sistema.

### Threshold del frontend

El frontend obtuvo 80% de line coverage y 100% de branch coverage sobre la lógica incluida en la medición.

Se configuró un threshold de 80% para líneas y ramas. De esta forma el estado actual pasa el gate, pero una reducción de cobertura puede bloquear el pipeline.

Se incluyeron `reservas.js` y `api.js`, que contienen la lógica seleccionada para pruebas unitarias. La interfaz React no se incluyó en este alcance porque el TP se enfocó en lógica unitaria sin DOM; las pruebas de interfaz o end-to-end corresponden a otro nivel de la pirámide de testing.

### Quality gate en Docker

Los Dockerfiles de backend y frontend se modificaron para incorporar una etapa de tests antes de generar la imagen final.

En backend la secuencia es:

`build -> test -> publish -> final`

En frontend la secuencia es:

`build -> test -> publish -> final`

La etapa `test` ejecuta las pruebas y valida el coverage. Las etapas posteriores dependen de ella, por lo que una imagen final no puede generarse si los tests o el quality gate fallan.

Esto mantiene al Dockerfile como parte de la fuente de verdad utilizada tanto localmente como por el pipeline.

### Integración con GitHub Actions

Se mantuvieron los jobs obligatorios `build-backend` y `build-frontend`.

Además de construir las imágenes Docker, el workflow ejecuta explícitamente las pruebas y genera coverage. Los reportes quedan visibles en los logs y se publican como artifacts descargables.

Esto permite distinguir si una falla proviene de tests, coverage o construcción de la imagen y facilita inspeccionar el resultado sin reproducir necesariamente la corrida de forma local.

### Demostración del quality gate

En el primer Pull Request se agregó de forma controlada una nueva rama de validación sin agregar inicialmente el test correspondiente.

Los 13 tests existentes continuaron pasando, pero el resultado de coverage fue:

- Line coverage: 75%
- Branch coverage: 69,23%
- Threshold: 70%

El pipeline quedó rojo porque branch coverage estaba por debajo del mínimo, aunque todos los tests habían pasado. Como `build-backend` es un check requerido, GitHub bloqueó el merge.

Luego se agregó el test `FechaConMasDeUnAnioDeAnticipacion_EsRechazada`. La cantidad de tests pasó a 14, el coverage volvió a superar el threshold y los jobs `build-backend` y `build-frontend` quedaron verdes. El Pull Request pudo entonces completarse mediante Squash and merge.

Esta prueba demuestra que “tests verdes” no implica automáticamente que un cambio cumpla la política de calidad.

### Segundo Pull Request bloqueado

Se creó un segundo Pull Request pequeño exclusivamente para demostrar el bloqueo del quality gate durante la defensa.

En esa rama se propone aumentar temporalmente el threshold del backend de 70% a 74%.

Los 14 tests continúan pasando. La medición del pipeline muestra aproximadamente 76,31% de line coverage y 73,07% de branch coverage. Como branch coverage no alcanza el 74%, `build-backend` queda rojo, `build-frontend` permanece verde y GitHub mantiene bloqueado el merge.

Este Pull Request se deja deliberadamente abierto y sin mergear para utilizarlo como evidencia durante la defensa.

### Reportes de coverage

Los reportes de coverage se generan automáticamente en CI y se publican como artifacts.

En backend se utiliza Coverlet para producir el archivo Cobertura y ReportGenerator para generar un resumen legible y un reporte HTML.

En frontend Vitest utiliza el provider V8 y genera reportes de texto, HTML, LCOV y resumen JSON.

Los artifacts de coverage no se versionan en Git porque son resultados generados y reproducibles. Por ese motivo `TestResults/`, `coverage/`, `coveragereport/` y `coverage.json` se agregaron a `.gitignore`.

### Problemas encontrados y resolución

Al agregar tests a los Dockerfiles se detectó que `backend/.dockerignore` excluía completamente `ReservasApi.Tests/`. Docker no podía copiar el proyecto y el build fallaba. Se eliminó esa exclusión porque TP5 requiere ejecutar los tests durante la construcción.

En frontend ocurría algo equivalente: `.dockerignore` excluía `**/*.test.js`. Vitest se ejecutaba dentro del contenedor pero informaba `No test files found`, dejando coverage en 0%. Se eliminó esa regla y los tests comenzaron a ejecutarse correctamente.

Al incorporar el reporte de backend en GitHub Actions, ReportGenerator buscaba `coverage.cobertura.xml` en una ruta diferente de la utilizada por Coverlet. Se corrigió `CoverletOutput` para generar el reporte en una ubicación estable dentro de `backend/coverage/`.

Durante el refactor para introducir `IClock`, los tests existentes dejaron de compilar porque el constructor de `ReservasController` comenzó a requerir un reloj. Se actualizaron los tests utilizando un reloj controlado y posteriormente se agregó el mock correspondiente.

También se detectó un test de frontend colocado accidentalmente dentro de otro `it`, situación que Vitest rechaza. Se corrigió la estructura dejando ambos tests al mismo nivel dentro del `describe`.

### Evidencias

- Corrida con reporte de coverage: https://github.com/agussesin/ingsoft3-tp01/actions/runs/37680815530/job/112996063875 
- Corrida bloqueada por threshold en el primer PR: https://github.com/agussesin/ingsoft3-tp01/actions/runs/37679191957/job/112990480403 
- Pull Request #16 mergeado con la secuencia completa: https://github.com/agussesin/ingsoft3-tp01/pull/16
- Segundo Pull Request abierto y bloqueado: https://github.com/agussesin/ingsoft3-tp01/pull/17

### Uso de asistencia de IA

La asistencia de IA se utilizó para explicar conceptos de testing, coverage, mocks y quality gates; proponer casos de prueba; orientar el refactor necesario para introducir `IClock`; revisar configuraciones de Coverlet, Vitest, Docker y GitHub Actions; y analizar errores encontrados durante la implementación.

Las propuestas no se incorporaron sin verificación. Se comprobaron mediante compilaciones locales, ejecución de tests, mediciones reales de coverage, builds Docker y corridas de GitHub Actions. También se verificó explícitamente el bloqueo del Pull Request cuando branch coverage quedó debajo del threshold y su recuperación después de agregar el test faltante.

## Decisiones del TP6 — Entrega continua y entornos

### Objetivo y arquitectura elegida

Se extendió la aplicación de reservas del semestre con una cadena de entrega: CI y publicación de imágenes → QA automático → smoke test → aprobación manual → PROD y smoke test.

Se eligió GitHub Actions porque el repositorio ya tenía allí los checks y la protección de main de TP4/TP5. Incorporar los despliegues al mismo workflow permite relacionar el cambio, su verificación y su promoción sin introducir otra plataforma de CI.

Render ejecuta cuatro Web Services Docker: reservas-api-qa, reservas-front-qa, reservas-api-prod y reservas-front-prod. Se mantuvieron frontend y backend separados porque tienen Dockerfiles, configuraciones y procesos independientes.

Neon contiene dos bases, app_qa y app_prod. Se eligieron bases separadas para que las pruebas de creación, edición o eliminación de reservas en QA no modifiquen los datos de PROD. Se prefirió Neon frente al PostgreSQL gratuito temporal de Render para evitar que la base expire durante el semestre.

El environment de GitHub llamado prod representa production de la consigna. Se conservó ese nombre porque el workflow, los secretos y las protecciones ya estaban vinculados correctamente; cambiarlo no agregaba una garantía funcional.

### Por qué implementé Continuous Delivery

La solución implementa Continuous Delivery: los cambios verificados llegan automáticamente a QA, pero una persona decide si promoverlos a PROD.

La aprobación tiene sentido para esta aplicación porque un fallo puede impedir consultar o registrar reservas. Antes de promover reviso el cambio, la versión desplegada en QA y su funcionamiento, en lugar de interpretar un tilde verde como garantía de que todo está bien.

No implementé Continuous Deployment. Para eliminar la aprobación necesitaría mayor confianza automatizada: pruebas de integración y end-to-end, verificación de versión desplegada, métricas de errores y latencia, alertas y una política de recuperación.

### Qué publica el pipeline y por qué el registry es confiable

Los jobs build-backend y build-frontend ejecutan la verificación y terminan construyendo y publicando sus respectivas imágenes en GHCR. Las etiquetas tienen el formato sha-<commit completo>, para relacionar cada imagen con el código que la produjo.

Los permisos contents: read y packages: write se declaran en cada job que publica. Así los jobs de despliegue no reciben innecesariamente permiso de escritura en paquetes. Se utiliza el GITHUB_TOKEN temporal de Actions.

La confianza en el camino automático depende de tres controles:

1. La protección de main exige Pull Request y checks aprobados.
2. La publicación solo se habilita con evento push y rama main.
3. Construir y publicar es el último paso propio del mismo job que ejecutó los tests. Si una verificación falla, ese paso no se ejecuta.

Los pasos de publicación no usan always() ni continue-on-error. Los reportes de coverage pueden guardarse aunque falle la verificación, pero eso no habilita publicar una imagen.

Publicar con tests fallidos haría que una imagen disponible en GHCR dejara de significar “superó la verificación”. La garantía corresponde al pipeline: una persona con permisos todavía podría hacer un docker push manual.

Se comprobó que ambos paquetes son públicos y que las imágenes del merge 8a30e5a se descargan después de ejecutar docker logout ghcr.io. Se utilizó --platform linux/amd64 porque el pipeline construye para la arquitectura del runner; en una Mac con Apple Silicon, un error de arquitectura no demostraría que el paquete sea privado.

Los enlaces de las dos corridas exigidas están al principio del documento: CI #36 muestra un PR con tests verdes y login al registry omitido; CI #37 permite inspeccionar el orden de los pasos de main.

Una etiqueta identifica la referencia publicada, pero técnicamente puede reasignarse. El digest identifica el contenido de la imagen. Para promover un artefacto exacto, usaría su digest.

### Qué quedó dentro de la imagen y qué quedó por entorno

La imagen del frontend contiene React compilado, nginx y default.conf.template. El navegador solicita /api/reservas al mismo origen: no necesita conocer el dominio de la API.

La dirección del backend se suministra mediante BACKEND_URL al arrancar nginx. DNS_RESOLVER también se configura por entorno. La imagen oficial procesa la plantilla y genera la configuración efectiva.

Esto evita construir un frontend distinto solo porque cambia el destino: QA recibe la URL de reservas-api-qa y PROD la de reservas-api-prod-zulr. Los valores predeterminados del Dockerfile permiten seguir usando Docker Compose local.

También se reemplazó el Host fijo reservas-api-qa.onrender.com por $proxy_host. El valor fijo resolvía QA, pero habría hecho que el frontend de PROD enviara un Host correspondiente al entorno equivocado. $proxy_host lo obtiene del destino configurado.

El backend recibe ConnectionStrings__DefaultConnection como variable del servicio de Render. El código y las credenciales tienen ciclos distintos: cambiar el entorno o la contraseña no debería exigir editar el repositorio ni incluir secretos en una imagen.

EnsureCreated crea el esquema al arrancar cuando todavía no existe. Esto permitió iniciar app_prod vacía. No lo considero un reemplazo de las migraciones necesarias para evolucionar un esquema con datos existentes.

### Cómo comprobé la separación de las bases

Desde el SQL Editor de Neon, con app_prod seleccionada, inserté una reserva con NombreCliente “SOLO PROD TP6”, Lugar “Prueba de aislamiento” y CantidadPersonas 1. La inserción devolvió Id 2.

Después comprobé:

- La API y el frontend de PROD mostraban “SOLO PROD TP6”.
- La API y el frontend de QA mostraban sus reservas “a” y “Felicitas”, sin el registro exclusivo de PROD.

La comparación se hizo con respuestas correctas y listados cargados. Un frontend mostrando “0 reservas” junto a un error de consulta no habría demostrado aislamiento.

También se creó una reserva desde el frontend de PROD y se comprobó su persistencia al recargar. Esto complementa el smoke, que solo consulta datos.

### Diseño de la promoción y alcance de los secretos

Deploy-qa depende de build-backend y build-frontend mediante needs. Solo se ejecuta sobre main. Deploy-prod depende de deploy-qa y también restringe la rama a main.

Los servicios de Render se configuraron con Auto-Deploy en Off. El despliegue ordinario lo dispara Actions después de la verificación; de otro modo el proveedor podría actualizarse sin esperar el pipeline o la aprobación.

Cada llamada al deploy hook agrega &ref=$GITHUB_SHA. Esto fija el commit de esa corrida. Sin ese parámetro, main podría avanzar durante la espera y terminaría desplegándose un cambio diferente del aprobado.

Los secretos RENDER_HOOK_API_QA y RENDER_HOOK_FRONT_QA pertenecen a qa. RENDER_HOOK_API_PROD y RENDER_HOOK_FRONT_PROD pertenecen a prod. Son credenciales de despliegue: quien posee un hook puede solicitar un deploy.

Las cadenas de conexión viven en las variables de los servicios correspondientes de Render. No se incluyeron en Git ni en los Dockerfiles.

Prod tiene required reviewer agussesin, Prevent self-review desactivado y bypass de administradores desactivado. Se restringieron los despliegues a main. La aprobación propia permite operar la práctica individualmente y sigue dejando registrada la decisión.

### Criterios del aprobador y rechazo real

Antes de aprobar reviso:

1. Qué cambia el PR y qué commit corresponde a la corrida.
2. Los checks y el smoke de QA.
3. El commit Live en los servicios y el cambio visible en QA.
4. La carga de reservas y la configuración del entorno.
5. El momento del despliegue y la versión conocida a la cual podría volver.

El aprobador tampoco puede observar todo: actualmente el smoke no confirma la versión, no hay pruebas end-to-end completas ni métricas de negocio que detecten reservas fallidas.

En CI #35, del PR #25, se rechazó PROD con un motivo escrito: durante la validación se habían observado errores al cargar reservas tras inactividad y todavía faltaba revisar la recuperación y medir el rollback. El enlace del rechazo está al principio del documento.

El título “Reservas UCC” llegó a QA, pero esa corrida no lo promovió a PROD. El rechazo no se convirtió luego en aprobación.

Se revisaron los logs y se preparó otra promoción mediante el PR #26, con el título “Reservas UCC · Gestión de reservas”. En CI #37 se verificó el título y la carga de datos en QA, se aprobó PROD y se comprobó a36851e como Live en ambos servicios.

La aprobación posterior no significa que se haya eliminado el error inicial tras inactividad. Se revisó el comportamiento, se reconoció la limitación y se continuó con una prueba controlada sobre la aplicación de práctica.

### Qué mostró la investigación del error de QA

El frontend registró respuestas 502 de /api/reservas a las 23:07 y 23:11 del 20/10/2026.

La API registró Application started a las 23:12:51 y una consulta correcta a PostgreSQL a las 23:12:58. El proxy volvió a responder 200 a las 23:13:37.

Los fallos precedieron al arranque observado de la API. La secuencia es compatible con reactivación tras inactividad, pero no permite afirmar la causa exacta de toda la demora. No se encontraron errores de PostgreSQL en los logs revisados.

El aviso de sobrescritura de HTTP_PORTS no impidió arrancar: después la aplicación quedó escuchando en el puerto 8080.

### Alcance y límites del smoke test

El smoke comprueba:

- /health de la API: proceso accesible.
- /api/reservas de la API: consulta real a la base.
- / del frontend: contenido servido.
- /api/reservas desde el frontend: comunicación mediante nginx.

Se agregaron comprobaciones del proxy porque la portada puede responder correctamente aunque el frontend no consiga hablar con su API.

El script permite hasta 30 intentos, espera 20 segundos entre intentos y limita cada petición a 10 segundos. Si no consigue respuestas satisfactorias, termina con error. El tiempo total puede superar diez minutos porque incluye las peticiones.

Los reintentos toleran demoras de arranque; no garantizan que cualquier interrupción se recupere ni prueban todas las reglas de negocio. Tampoco verifican escritura, contenido semántico del JSON o versión exacta.

Se observó una limitación concreta: el smoke de QA respondió correctamente a las 23:23:30, mientras el frontend nuevo quedó Live a las 23:24:02. El verde podía estar verificando la versión anterior.

Por eso se comprobó manualmente el SHA Live en Render y el título visible. La mejora pendiente es informar la versión desde la aplicación y compararla con el SHA esperado, o consultar automáticamente el estado del despliegue. Esto corresponde al trabajo de TP7.

### Por qué reconstruir en Render pierde una garantía

GHCR almacena las imágenes verificadas, pero los servicios de este TP reconstruyen el repositorio con nuestros Dockerfiles.

El SHA explícito fija el código solicitado, pero no demuestra que el binario ejecutado sea la misma imagen publicada por CI. Una imagen base o un recurso externo podría cambiar entre construcciones.

Este TP promueve el commit; todavía no garantiza la promoción del mismo artefacto por digest. Desplegar directamente la imagen verificada es la mejora prevista para TP7.

### Free tier: consumo observado y decisiones

El 21/10/2026, Billing de Render mostraba:

- 7,07 de 750 horas gratuitas consumidas.
- 18 de 500 minutos de pipeline consumidos.
- Cuatro servicios en el workspace.

Los presupuestos son compartidos por el workspace. Estos valores son una medición de ese momento, no una proyección garantizada hasta la defensa.

Los servicios gratuitos pueden dormir tras inactividad y demorar al reactivarse. Neon también puede suspender cómputo inactivo. El pipeline incorpora reintentos; la interfaz actualmente puede mostrar un error inicial y necesitar recarga.

Decidí no mantener los cuatro servicios despiertos mediante pings permanentes: consumirían horas sin aportar una necesidad real a esta práctica. Revisaré Billing antes de la defensa y evitaré repetir todos los jobs cuando alcance con repetir deploy-prod.

Si se agotan los minutos de construcción, una respuesta correcta del servicio anterior puede ocultar que la actualización no ocurrió. Por eso se revisa el commit Live además del smoke.

El fallback previsto es un runner propio con dos proyectos Compose separados y despliegues ejecutados por Actions, manteniendo la aprobación de GitHub. No fue implementado ni probado; no lo presento como un segundo entorno operativo.

### Patrón elegido para una producción real

Para una producción con usuarios reales elegiría blue-green si la continuidad del servicio justifica el costo adicional. Una interrupción de esta aplicación puede impedir crear, editar o consultar reservas; poder volver rápidamente a la versión anterior reduciría ese impacto.

Blue-green mantendría la versión actual y la nueva disponibles, verificaría la nueva y cambiaría el tráfico. Su ventaja sería una vuelta rápida al entorno anterior. El costo es mantener capacidad duplicada durante la transición y administrar el enrutamiento.

Con el uso de práctica y el presupuesto actual no implementaría esa duplicación: hoy utilizo el mecanismo de despliegue de Render y rollback manual. No afirmo tener blue-green implementado.

Antes de adoptarlo incorporaría un punto de conmutación, verificación de versión, métricas de errores y latencia, alertas y pruebas sintéticas. También exigiría cambios de esquema compatibles con ambas versiones.

No elegiría canary todavía porque faltan tráfico y métricas suficientes para decidir si ampliar la exposición. Rolling requiere compatibilidad entre versiones durante el reemplazo y su reversión es gradual.

Un feature flag podría servir para desplegar un nuevo formulario de reservas apagado y habilitarlo después. Separaría despliegue de exposición de funcionalidad, pero necesitaría gestión del flag y posterior eliminación para no acumular deuda.

### Rollback actual: procedimiento y medición real

El procedimiento probado utiliza el Dashboard de Render:

1. Identificar el último commit bueno que estuvo realmente en PROD.
2. Revisar compatibilidad de esquema y cambios de configuración.
3. Seleccionar el despliegue anterior de la API y confirmar Rollback.
4. Esperar su estado Live y comprobar el commit.
5. Repetir para el frontend.
6. Verificar la interfaz y la consulta de reservas.
7. Registrar el destino, las duraciones y el resultado.

El 21/10/2026 se volvió de a36851e a 8a30e5a. No se eligió 17cab6b porque su promoción había sido rechazada y nunca llegó a PROD.

Render registró los nuevos despliegues como “Rolled back by you via Dashboard”:

| Servicio | Commit restaurado | Duración individual |
|---|---|---:|
| API PROD | 8a30e5a | 20,9 s |
| Frontend PROD | 8a30e5a | 11,2 s |

Registros de la prueba del 21/10/2026, con horarios GMT-3:

- [Rollback de API: 20,9 s](https://dashboard.render.com/web/srv-dbbuhoo473hc73cjm6b0/deploys/dep-dbc2r6bbc2fs73b38h10). El registro muestra 00:12:25 como hora del despliegue y el log informa “Your service is live” a las 00:12:48.
- [Rollback de frontend: 11,2 s](https://dashboard.render.com/web/srv-dbbul9e1egvs73esbgug/deploys/dep-dbc2sg6q1p3s73c3ntng). El registro muestra 00:15:12 como hora del despliegue.

Estos enlaces requieren acceso al Dashboard de Render y se mostrarán durante la defensa. Las duraciones son las informadas por Render; no se calculó un tiempo total de recuperación sumándolas.

Los registros se encuentran en el historial de despliegues de reservas-api-prod y reservas-front-prod. Son las duraciones de los rollbacks nuevos, no las de los despliegues originales.

No se suman ni se presentan como tiempo total de recuperación: se ejecutaron secuencialmente con pausas para inspeccionar y no se midió un incidente completo de extremo a extremo.

La comprobación funcional mostró el título anterior “Reservas” y las dos reservas de PROD, incluida “SOLO PROD TP6”. QA conservó la versión nueva.

El rollback cambió el código ejecutado y conservó los datos. No demuestra que pueda recuperar datos eliminados. Si una migración borra una columna, volver al código anterior no la restaura; harían falta backups, recuperación y una estrategia de migraciones compatibles.

El procedimiento manual de emergencia requiere acceso a Render y puede ejecutarse fuera de la aprobación de Actions. Esa excepción debe registrarse. El gate del workflow protege su camino de despliegue, no todas las acciones posibles de un administrador del proveedor.

### Restauración después de la prueba

Para restaurar a36851e se volvió a ejecutar únicamente deploy-prod de CI #37. GitHub volvió a solicitar aprobación, que se otorgó después de verificar el resultado del rollback.

Render reconstruyó y desplegó a36851e:

- API: 45,8 segundos.
- Frontend: 1 minuto 17 segundos.

Se comprobó el SHA Live en ambos, el título “Reservas UCC · Gestión de reservas” y la conservación de las reservas.

También se observó que Actions podía terminar su smoke mientras Render seguía construyendo. Por eso el final de la restauración se confirmó en Render y en la aplicación.

### Corridas simultáneas y promociones antiguas

El parámetro ref evita que una corrida despliegue accidentalmente la punta actual de main. Sin embargo, aprobar una corrida vieja después de una nueva sí puede hacer retroceder PROD.

Actualmente no se configuró una serialización automática de despliegues. La regla operativa es revisar el SHA y rechazar promociones obsoletas antes de aprobar una nueva. No se considera que el gate ordene automáticamente las aprobaciones pendientes.

### Problemas reales y correcciones

Se corrigió el Host fijo de QA en nginx para permitir configurar el backend de PROD.

Se detectó que un secreto se había cargado inicialmente dentro de un environment creado por error con el nombre del secreto. Se cargaron los hooks en prod, se repitió la ejecución y se verificó el commit desplegado en cada servicio.

Se distinguió el estado verde de Actions del estado Live del nuevo despliegue. También se verificaron las URLs para evitar confundir las pantallas de QA y PROD.

Se investigaron los errores iniciales de consulta con logs de ambos componentes. Se registró la correlación temporal sin presentar una hipótesis como causa demostrada.

### Tag y Release de entrega

La consigna exige v6.0.0. Se publicará como tag y GitHub Release con notas después de integrar esta documentación y verificar el commit final en PROD.

El tag debe identificar el commit efectivamente desplegado. No se elegirá automáticamente la punta de main ni se etiquetará un commit que todavía esté esperando aprobación.

La numeración v6.0.0 identifica el cierre del TP6; no representa una decisión de SemVer basada en cambios de producto.

### Uso de IA: responsabilidades y verificación

La IA propuso comandos, fragmentos de workflow y nginx, consultas SQL y borradores de documentación. También ayudó a interpretar las diferencias entre CI, Delivery y Deployment, revisar logs y ordenar las pruebas.

Yo ejecuté los comandos, edité los archivos, creé e integré los Pull Requests, configuré los servicios y secretos, inspeccioné las respuestas y tomé las decisiones de aprobar, rechazar, hacer rollback y restaurar.

Las propuestas se comprobaron mediante:

- Checks y logs de Actions.
- Commits y estados Live de Render.
- Descarga de ambas imágenes sin credenciales.
- Inserción SQL exclusiva en app_prod y comparación con QA.
- Creación y persistencia de reservas desde la interfaz.
- Rechazo registrado y aprobación posterior.
- Rollback real, duraciones registradas y conservación de datos.
- Restauración y verificación del cambio visible.

La IA dio inicialmente por terminado el trabajo antes de revisar la consigna completa. Esa conclusión se corrigió: se identificaron y completaron pruebas faltantes y se dejó la documentación y la release como pendientes hasta verificarlas.

El texto y el motivo de rechazo también fueron propuestos con asistencia de IA. Los adopté después de contrastarlos con el comportamiento observado y decidir frenar esa promoción. Debo poder explicar cada afirmación y mostrar su evidencia en la defensa.


## Decisiones del TP7 - Imágenes, integración y E2E

### Build once, deploy many

En TP6, Actions publicaba las imágenes, pero Render reconstruía el repositorio para cada entorno. Aunque QA y PROD recibieran el mismo commit, una dependencia o imagen base podía cambiar entre construcciones.

En TP7, el pipeline publica una imagen de backend y una de frontend por commit integrado. Los cuatro servicios de Render ejecutan esas imágenes de GHCR. QA verifica los artefactos que después recibe PROD, sin reconstruirlos durante la promoción.

Se conservaron los jobs de build y publicación del TP6. La publicación sigue al final de cada job, después de sus verificaciones, y solamente se habilita en pushes a main. Se utiliza GITHUB_TOKEN con packages: write, sin incorporar un token personal.

### Etiquetas e identidad de la versión

Las imágenes usan sha-<commit completo>, con los 40 caracteres del commit de main. Un SHA abreviado no identifica una etiqueta existente en el registry.

No se publica latest porque es una referencia móvil que no identifica la versión aprobada. La etiqueta sha relaciona la imagen con su código, pero técnicamente también puede reasignarse: volver a ejecutar el build del mismo commit podría publicar otro contenido bajo esa etiqueta. Por eso no se reconstruyen corridas antiguas para promover versiones.

El digest sha256 identifica el contenido de forma inmutable. Promover por digest daría una garantía más fuerte; este TP utiliza la convención sha-<commit>.

El tag de Git v7.0.0 y la release identificarán el cierre del práctico sobre el commit efectivamente desplegado en PROD. Para encontrar sus imágenes se obtiene el commit con `git rev-list -n1 v7.0.0` y se utiliza sha-<ese commit> en ambos paquetes.

### Cambio de fuente en Render

Se cambió la fuente de los cuatro servicios existentes a Existing Image. No se crearon servicios nuevos: se conservaron URLs, variables, hooks e historial.

La imagen inicial configurada fue sha-335c51f863060edcd996d80a89f3492411e9cb26. Esa configuración es el punto de partida, no una indicación de la versión actualmente ejecutada. Cada deploy del pipeline envía su propia imagen mediante imgURL.

Primero se probó el frontend de QA mediante su deploy hook. Después se cambiaron las fuentes de los otros tres servicios y se integró el cambio conjunto de QA y PROD en el workflow.

Los hooks dejaron de recibir ref y ahora reciben imgURL mediante curl con --get y --data-urlencode. QA y PROD calculan las referencias usando el mismo github.sha. Un nombre de imagen incompatible o una etiqueta inexistente hace fallar el pedido y, mediante curl -f, el paso del pipeline.

Los paquetes son públicos y Render los descarga sin credenciales. Las imágenes no contienen contraseñas de las bases ni claves de despliegue.

### Cómo se comprueba qué imagen corre

En Deploys de cada servicio se inspecciona el último despliegue activo: debe nombrar la etiqueta sha de la corrida y mostrar Deploy Hook como disparador. Se comprobó para API y frontend tanto en QA como en PROD.

El smoke verifica respuestas de health, consulta a la base, frontend y proxy. No demuestra por sí solo que el despliegue nuevo haya terminado: una versión anterior puede seguir respondiendo mientras Render despliega o si el despliegue falla.

Verificar automáticamente el commit servido requeriría incorporarlo a la imagen y compararlo desde el smoke. Es una mejora conceptual que no se implementó en este TP. La comprobación de versión se realizó manualmente en Render.

No se utiliza Manual Deploy para promover versiones: puede desplegar la imagen inicial de Settings, que puede ser anterior a la última enviada por el pipeline.

### La misma imagen del frontend en ambos entornos

La imagen contiene React compilado, nginx y su plantilla de configuración. El navegador usa la ruta relativa /api/reservas.

BACKEND_URL se configura al arrancar el servicio y apunta a la API de su entorno. DNS_RESOLVER también se configura en el servicio. Las conexiones a PostgreSQL se mantienen en las variables de cada backend.

Así cambia la configuración del entorno, sin construir un frontend distinto para QA y PROD.

### Pruebas de integración elegidas

Se implementaron tres pruebas en frontend/e2e/api.spec.js con el fixture request de Playwright, sin navegador:

1. Crear una reserva, consultarla por ID y en el listado, borrarla y comprobar que ya no existe.
2. Enviar nombreCliente vacío, comprobar HTTP 400 y verificar que no se agregó ningún registro. Es la adaptación del caso de “título vacío” de la guía a la entidad Reserva.
3. Crear una reserva, modificar lugar y cantidad de personas, consultar nuevamente para verificar persistencia y borrarla comprobando su ausencia.

La edición se eligió porque corregir los datos de una reserva es una operación cotidiana. Si una modificación parece guardarse y después desaparece, la persona que administra las reservas necesita reclamarlo.

Estas pruebas recorren HTTP, controlador, Entity Framework, driver de PostgreSQL y base real. No usan WebApplicationFactory, SQLite, InMemory ni respuestas simuladas.

Se eligió integración amplia contra la API desplegada de QA. Además de persistencia, ejercita configuración, red y despliegue reales sin levantar otra base dentro del job. Pierde aislamiento y depende de disponibilidad y datos compartidos. La integración estrecha, con API y PostgreSQL descartables en el pipeline, permitiría detectar problemas antes del deploy y aislar corridas, a cambio de más configuración.

No se repiten exhaustivamente todos los bordes del validador: corresponden a los unitarios del TP5.

### Flujos E2E elegidos

Se implementaron tres flujos en frontend/e2e/reservas.spec.js:

1. Completar el formulario, guardar, comprobar la tarjeta propia, eliminar mediante la interfaz y verificar que desaparece.
2. Enviar un nombre compuesto por espacios, comprobar el mensaje de error visible y verificar que no se creó una reserva con el lugar único de esa prueba.
3. Crear una reserva, editar lugar y cantidad de personas, recargar y comprobar que los cambios persisten; luego eliminarla.

Cada flujo interactúa con la pantalla y verifica su propio resultado. La edición con recarga se eligió porque perder una corrección al volver a abrir la agenda afecta directamente al trabajo diario.

Se usan labels y roles accesibles. Se agregó role="alert" al mensaje de error y se selecciona cada tarjeta por el nombre único de la reserva. No se simula el backend ni se interceptan respuestas con mocks.

No se trasladaron a E2E todas las combinaciones de fechas, longitudes y cantidades: serían pruebas lentas y redundantes con la base de la pirámide.

### Datos propios y limpieza

Los nombres combinan fecha de ejecución y UUID para evitar colisiones. Las fechas de reserva se calculan hacia el futuro, sin depender de una fecha fija.

Las pruebas de integración que crean datos ejecutan su limpieza en finally y comprueban DELETE, consulta por ID con 404 y ausencia en el listado.

Las E2E de creación y edición borran desde la pantalla y comprueban la desaparición. Además tienen una limpieza de respaldo mediante pedidos reales al proxy del frontend, seguida de una consulta que verifica la ausencia.

Se usa un worker por suite. La comprobación de que el alta inválida no modifica los IDs supone que no hay otra escritura simultánea en QA; no debe operarse manualmente la agenda mientras corre la suite.

### Cold start y pruebas flaky

La configuración establece 60 segundos por test, 15 segundos por aserción y un reintento. El smoke y la integración preceden al navegador y ayudan a despertar QA.

Se utilizan las esperas de Playwright, sin sleeps dentro de los tests ni saltos automáticos si el entorno no responde. Un entorno inaccesible debe hacer fallar la prueba.

Un test flaky pasa o falla sin un cambio relevante en la aplicación. Que pase en el reintento no demuestra que esté bien: Playwright lo marca como flaky y debe revisarse. Los reportes verdes locales revisados mostraron tres aprobados, cero flaky y cero salteados.

Durante la prueba inicial del frontend desplegado apareció un error al cargar reservas. Después, API y proxy respondieron 200 y la recarga mostró los datos. Es compatible con arranque en frío, pero no se afirmó haber demostrado ni eliminado su causa. Antes de entregar y defender deben verificarse datos cargados, no solamente una portada accesible.

### Gate de promoción y aprobación

Las suites están en el mismo workflow que los deploys y corren por el push a main:

build-backend y build-frontend → deploy-qa y smoke → integracion → e2e → aprobación → deploy-prod y smoke.

integracion depende de deploy-qa; e2e depende de integracion; deploy-prod depende de e2e. No se usa continue-on-error, ocultamiento del código de salida ni condiciones que permitan promover después de un fallo.

Los pasos que publican reportes utilizan !cancelled() para conservar evidencia también cuando falla una suite. Sus artefactos tienen nombres distintos y retención de 30 días.

El environment de producción conserva el nombre prod utilizado en TP6, con required reviewer y secretos propios. Es el entorno denominado production en la consigna. Se agregó concurrency para deploy-prod con cancel-in-progress: false.

### Demostración del freno y diagnóstico

Se cambió solamente el texto visible del botón de la aplicación, de “Guardar reserva” a “Confirmar reserva”. El commit de la rotura no modificó e2e ni otros tests.

Los unitarios y builds pasaron. En la corrida 39620225388, el smoke pasó, las tres pruebas de integración aprobaron y las tres E2E fallaron. deploy-prod quedó salteado sin solicitar aprobación.

El reporte rojo y la traza del reintento mostraron el formulario completado y el click esperando el nombre “Guardar reserva”, mientras la pantalla ofrecía “Confirmar reserva”. El test agotó su timeout. Después apareció un error secundario de limpieza porque el contexto de request ya estaba cerrado; la traza permitió distinguirlo de la causa inicial. El click de guardar no llegó a ejecutarse.

El par integración verde/E2E roja indica que las operaciones verificadas de API y base funcionan, pero el flujo de pantalla no cumple el contrato esperado. Si fallara integración, E2E quedaría salteada por su dependencia: apuntaría a API, base, configuración o conectividad, y requeriría diagnóstico.

Se restauró el texto de la aplicación sin modificar las pruebas. La corrida 39624631691 pasó integración y E2E, solicitó aprobación y terminó correctamente en PROD. Se verificó en los cuatro servicios la etiqueta sha-d3ce7332403048ad3f359dac27fa862946938e67 mediante Deploy Hook.

El gate protege los flujos elegidos, no toda la aplicación. No cubre automáticamente casos no escritos, problemas exclusivos de PROD, permisos administrativos del proveedor ni configuraciones que cambien después de probar.

### QA compartido y corridas concurrentes

QA es un entorno compartido. Una corrida nueva podría desplegar otra imagen mientras la anterior está probando; incluso un resultado verde podría corresponder parcialmente a la imagen equivocada.

La regla operativa es un merge por vez hasta terminar integración y E2E. Para investigar se comparan horarios de Actions y etiquetas de Render. Una promoción anterior que haya quedado obsoleta se rechaza con motivo; no se repiten sus suites contra un QA que ya cambió de imagen.

La concurrencia de deploy-prod no bloquea QA ni sustituye esa revisión. Un entorno descartable por corrida resolvería el aislamiento, pero queda fuera de esta implementación.

### Problemas encontrados

Se corrigió la sangría de los jobs para evitar que quedaran dentro del script del smoke. También se verificó que las URLs fueran texto simple y no enlaces Markdown pegados dentro del código.

Vitest se configuró para excluir e2e/** y evitar que intente ejecutar los specs de Playwright. Se versionaron package.json y package-lock.json, y se excluyeron playwright-report/ y test-results/ del repositorio.

Las fechas devueltas por la API se comparan por instante y no por representación textual: Z y +00:00 pueden expresar el mismo momento.

La instalación local advirtió incompatibilidad de la versión Node 23 con dependencias de ESLint y reportó vulnerabilidades. La instalación y las pruebas utilizadas finalizaron correctamente; eso no equivale a haber corregido esas advertencias. El pipeline utiliza Node 22.

### Release y conservación de evidencias

La release v7.0.0 se crea al cerrar la entrega, sobre el commit comprobado como activo en PROD mediante Deployments y Render, después de incorporar y verificar la documentación.

Se utiliza --verify-tag para impedir que GitHub cree accidentalmente un tag sobre la punta de main. Los dos paquetes deben conservar la etiqueta sha correspondiente al commit de la release.

Los enlaces de la corrida roja, ambos reportes y la corrida verde están al principio del documento. Los artefactos tienen retención limitada; las URLs de QA y PROD y los registros de Render deben mantenerse disponibles hasta la defensa.

### Uso de IA y verificación

La IA asistió en la configuración de Playwright, los seis tests, el workflow, la interpretación de errores y los borradores de documentación. Los cambios se aplicaron y revisaron paso a paso.

Se verificaron mediante seis pruebas verdes contra Docker Compose y PostgreSQL reales; reporte HTML y traza local; suites contra QA desplegado; rotura de la aplicación con tests intactos; comparación de reportes verde y rojo; bloqueo de PROD; arreglo, aprobación y promoción posterior.

Las decisiones de aprobar y configurar los entornos fueron realizadas por la estudiante. Debo poder explicar qué produce cada prueba, qué verifica, cómo limpia sus datos, contra qué entorno corre y qué ocurre cuando falla.


# TP8 — Infraestructura como Código (Terraform)

## Objetivo y alcance

Se implementó un entorno de preproducción (`preprod`) utilizando Terraform como herramienta de Infraestructura como Código (IaC). El objetivo es poder crear, verificar, destruir y recrear la infraestructura mediante archivos declarativos, sin configurar manualmente cada servicio desde las interfaces de Neon y Render.

El entorno `preprod` es independiente de QA y PROD. Se reutilizan las imágenes Docker generadas en los trabajos anteriores, pero se crean servicios y una base de datos exclusivos para este entorno.

No se modificó el pipeline de promoción QA → PROD, ya que el alcance de este trabajo es el aprovisionamiento de infraestructura.

## Organización y proveedores

Se creó la carpeta `infra/` con los siguientes archivos:

- `providers.tf`: configuración de Terraform y versiones de proveedores.
- `neon.tf`: proyecto, usuario y base de datos PostgreSQL.
- `render.tf`: servicios de backend y frontend.
- `.terraform.lock.hcl`: versiones y verificaciones de integridad de las dependencias seleccionadas.

Se utilizó Terraform 1.17.0 con los proveedores `kislerdm/neon` versión `0.18.0` y `render-oss/render` versión `1.9.1`.

Se fijaron las versiones de los proveedores para reducir cambios inesperados entre ejecuciones. El archivo de bloqueo se versiona para favorecer la reproducibilidad.

La infraestructura se definió de manera declarativa: los archivos describen el estado deseado y Terraform determina las operaciones necesarias para alcanzarlo.

## Aislamiento de preproducción

Se decidió crear un proyecto nuevo en Neon llamado `reservas-preprod`, con una base de datos y un usuario propios, ambos llamados `reservas_preprod`.

El backend y el frontend se desplegaron como servicios independientes de Render, denominados `reservas-api-preprod` y `reservas-front-preprod`, utilizando el plan gratuito y la región Ohio.

El backend recibe la cadena de conexión mediante la variable de entorno `ConnectionStrings__DefaultConnection`. Esta cadena se construye a partir de los recursos creados por Terraform y requiere SSL para conectarse a Neon.

El frontend recibe `BACKEND_URL` con la dirección del backend de `preprod`, obtenida del recurso correspondiente de Terraform. También se configuró `DNS_RESOLVER` con el valor `8.8.8.8` para la resolución DNS desde Nginx.

Las referencias entre recursos permiten que Terraform determine el orden de creación. Por ejemplo, la base de datos depende del proyecto y del usuario de Neon; el frontend utiliza la URL del backend.

Se evitó reutilizar la base de datos o los servicios de QA y PROD. Esto permite realizar pruebas de infraestructura sin alterar los entornos existentes.

## Reutilización de imágenes Docker

En lugar de reconstruir las aplicaciones durante el aprovisionamiento, se utilizaron las imágenes publicadas previamente en GitHub Container Registry:

- `ghcr.io/agussesin/ingsoft3-tp01-backend`
- `ghcr.io/agussesin/ingsoft3-tp01-frontend`

Ambas utilizan la etiqueta:

`sha-45300b62ba73a971ad382c9ed22ac96f0a3cceca`

Se eligió una etiqueta asociada a un commit específico, en lugar de `latest`, para identificar exactamente qué versión de la aplicación se despliega y evitar cambios involuntarios de imagen.

Esto separa la construcción del software del aprovisionamiento de la infraestructura.

## Credenciales, estado y archivos versionados

Las credenciales de Neon y Render se proporcionaron mediante variables de entorno de la terminal: `NEON_API_KEY`, `RENDER_API_KEY` y `RENDER_OWNER_ID`.

Las claves no se escribieron directamente en los archivos `.tf` ni se incorporaron al repositorio.

Se modificó `.gitignore` para excluir `.terraform/`, archivos `*.tfstate`, `*.tfstate.*`, `*.tfvars`, `*.tfvars.json` y registros de fallos de Terraform.

El estado de Terraform contiene información sobre los recursos creados y puede incluir valores sensibles, como contraseñas y cadenas de conexión. Por eso no debe publicarse en GitHub.

En cambio, `.terraform.lock.hcl` sí se versiona porque permite conservar la selección de proveedores.

El estado se mantiene localmente. Esta solución es adecuada para la ejecución individual del trabajo, pero no proporciona las ventajas de un backend remoto con control de acceso y bloqueo para trabajo colaborativo.

## Validación y aprovisionamiento

Primero se ejecutó `terraform init` para descargar e inicializar los proveedores.

Luego se utilizó `terraform validate` para comprobar la validez de la configuración y `terraform fmt` para mantener un formato consistente.

Antes de crear recursos, `terraform plan` mostró:

`Plan: 5 to add, 0 to change, 0 to destroy.`

Los cinco recursos administrados fueron:

1. Proyecto de Neon.
2. Usuario de PostgreSQL en Neon.
3. Base de datos PostgreSQL en Neon.
4. Servicio de backend en Render.
5. Servicio de frontend en Render.

La primera ejecución de `terraform apply` falló porque la API de Neon requería especificar `org_id` para crear el proyecto dentro de la organización.

Se corrigió la configuración de `neon_project` agregando el identificador de la organización. Después de validar nuevamente, `terraform apply` finalizó con:

`Apply complete! Resources: 5 added, 0 changed, 0 destroyed.`

Este error permitió comprobar que una configuración sintácticamente válida no garantiza que el proveedor externo acepte la operación. Terraform depende también de los requisitos y permisos de las APIs utilizadas.

## Verificación funcional

Después del aprovisionamiento se verificó que la API respondiera correctamente al endpoint `/health`, con estado HTTP 200 y la respuesta `{"status":"ok"}`.

También se consultó `/api/reservas`, que respondió HTTP 200 con una lista vacía (`[]`), consistente con una base de datos nueva.

Se abrió el frontend desplegado en Render y se comprobó que la interfaz del gestor de reservas cargara correctamente y mostrara cero reservas.

Estas comprobaciones permiten verificar el funcionamiento inicial de la aplicación en `preprod`, además de la creación de los recursos.

Una respuesta correcta de `/health` por sí sola no demuestra la conexión a PostgreSQL; por eso también se probó un endpoint que consulta reservas.

## Idempotencia

Con los cinco recursos creados se ejecutó nuevamente `terraform plan`.

El resultado fue:

`No changes. Your infrastructure matches the configuration.`

Esto confirma que, en ese momento, el estado real de la infraestructura coincidía con la configuración declarada y Terraform no necesitaba realizar modificaciones.

La idempotencia es importante porque permite repetir operaciones de infraestructura sin generar recursos duplicados ni cambios innecesarios.

## Destrucción y recreación

Se ejecutó `terraform destroy` para eliminar completamente el entorno `preprod`.

Antes de confirmar, el plan indicó:

`Plan: 0 to add, 0 to change, 5 to destroy.`

La ejecución finalizó correctamente:

`Destroy complete! Resources: 5 destroyed.`

Posteriormente se volvió a ejecutar `terraform apply` para reconstruir el entorno a partir de los archivos declarativos.

La prueba demuestra que los recursos de preproducción no dependen de una configuración manual irrepetible: pueden eliminarse y reconstruirse mediante Terraform.

La destrucción de la base de datos implica la pérdida de sus datos. Por eso este procedimiento se aplica únicamente al entorno descartable `preprod`, no a QA ni PROD.

## Limitaciones y decisiones pendientes

El uso del plan gratuito de Render puede introducir tiempos de arranque en frío, por lo que la disponibilidad inmediata de la aplicación no está garantizada.

Las imágenes Docker se referencian mediante una etiqueta de commit fija. Si se desea desplegar otra versión, debe actualizarse esa referencia de manera explícita.

El estado de Terraform es local y no se utiliza un backend remoto compartido. Tampoco se automatizó el aprovisionamiento mediante GitHub Actions.

La prueba de idempotencia demuestra ausencia de diferencias en el momento de la consulta, pero no reemplaza una prueba específica de detección de cambios externos o *drift*.

## Uso de IA y verificación

La IA asistió en la instalación y configuración de Terraform, la definición de recursos de Neon y Render, la interpretación del esquema de los proveedores, la resolución del error de `org_id` y la preparación de la documentación.

Los comandos fueron ejecutados y sus resultados revisados paso a paso.

Se verificó la creación de cinco recursos, la respuesta HTTP del backend, la consulta de reservas, la carga del frontend, la ausencia de cambios en un nuevo plan y la destrucción de los cinco recursos.

Para la defensa debo poder explicar qué es IaC, qué diferencia existe entre `init`, `validate`, `plan`, `apply` y `destroy`, cómo Terraform conoce las dependencias, qué contiene el estado, por qué se excluye de Git y cómo se garantiza el aislamiento de `preprod` respecto de QA y PROD.

## Decisiones del TP9 — DevSecOps, observabilidad y feedback continuo

### Objetivo y estrategia

Se incorporaron controles de seguridad y observabilidad a la aplicación de reservas ya desarrollada y desplegada en QA y PROD.

Se eligió integrar las herramientas con GitHub y Render, conservando la cadena de integración continua, pruebas y aprobación manual de producción. El objetivo es detectar problemas en las dependencias, el código, la disponibilidad y la ejecución real de la aplicación.

Esta estrategia aplica el principio *shift-left*: incorporar verificaciones de seguridad durante el desarrollo y no esperar a una auditoría final.

### Dependabot — Seguridad de dependencias

Se configuró Dependabot para NuGet (backend), npm (frontend) y GitHub Actions, con el objetivo de detectar actualizaciones y vulnerabilidades conocidas en las dependencias del proyecto.

Se integró la configuración mediante el PR #34. Las actualizaciones propuestas por Dependabot deben revisarse mediante Pull Requests y pasar los controles del pipeline antes de incorporarse a `main`.

**PR de actualización mergeado:** PR #46, creado por Dependabot, que actualizó `Microsoft.NET.Test.Sdk` de `17.8.0` a `18.11.0` en `backend/ReservasApi.Tests/ReservasApi.Tests.csproj`. Se aprobó porque el cambio estaba limitado a una dependencia de ejecución de pruebas, sin modificar la lógica de negocio, y los controles aplicables al PR finalizaron correctamente. Se integró mediante Squash Merge en `main` (commit `4f49256`). Aunque la actualización superó los controles automatizados, esto no elimina todos los riesgos de compatibilidad.

La confianza para integrar una actualización proviene de la revisión del cambio y de los controles automatizados de compilación, tests y coverage implementados en los TP4 y TP5. Sin embargo, un pipeline verde no garantiza la ausencia de vulnerabilidades ni de regresiones no cubiertas.

Durante la revisión se observaron cinco alertas abiertas en Dependabot, incluidas vulnerabilidades relacionadas con Vitest y su dependencia transitiva `tinypool`. Se intentó actualizar las dependencias de pruebas del frontend, pero npm produjo el error `Cannot read properties of null (reading 'edgesOut')`. Se evitó forzar una actualización sin verificar su compatibilidad.

Estas vulnerabilidades no se presentan como resueltas. Quedan pendientes de evaluación, actualización y nueva ejecución de las pruebas.

### CodeQL — Análisis estático

Se activó CodeQL mediante la configuración predeterminada de GitHub para analizar el código del repositorio.

Durante la implementación se detectaron cuatro alertas de severidad media relacionadas con permisos de los workflows. Se corrigieron mediante el PR #49 y se verificó posteriormente que Code scanning mostrara cero alertas abiertas y cuatro cerradas.

CodeQL analiza patrones potencialmente inseguros en el código y la configuración, mientras que las pruebas automatizadas verifican comportamientos definidos. Son controles complementarios: cero alertas abiertas no significa que el software esté libre de vulnerabilidades.

### Protección de secretos

La protección contra la publicación accidental de secretos constituye una tercera capa de seguridad, diferente de Dependabot y CodeQL.

**Estado de push protection:** habilitada y verificada visualmente en GitHub Settings → Advanced Security, junto con Secret Protection. Push Protection bloquea los pushes que contienen patrones de secretos compatibles, reduciendo el riesgo de exposición accidental de credenciales.

Las credenciales de Render, Neon y Sentry utilizadas como configuración sensible se administran mediante variables de entorno y secretos, evitando incorporarlas directamente al repositorio.

El DSN público del frontend de Sentry no equivale a una clave administrativa: permite enviar telemetría, pero no consultar ni administrar los datos del proyecto.

### UptimeRobot — Monitoreo externo de producción

Se configuró UptimeRobot para consultar cada cinco minutos el endpoint:

`https://reservas-api-prod-zulr.onrender.com/health`

Se eligió un monitor externo porque puede detectar que el servicio no responde incluso cuando la propia aplicación no está disponible para registrar el incidente.

Se provocó una caída controlada de producción y posteriormente se restauró el servicio. El historial del monitor registró los estados DOWN y UP.

**Tiempo de aviso:** UptimeRobot confirmó el estado DOWN el 22/10/2026 a las 17:02:46 y envió el correo de alerta a las 17:02:48 (2 segundos después). El servicio se recuperó a las 17:12:55 y se envió el correo de recuperación a las 17:12:57. El incidente duró 10 minutos y 9 segundos. No se midió el tiempo exacto desde la suspensión manual del servicio hasta su detección.

El intervalo de cinco minutos es la frecuencia de comprobación, no una garantía de que la alerta llegue exactamente cinco minutos después de producirse una caída.

El endpoint `/health` permite comprobar disponibilidad básica, pero no garantiza que todas las operaciones de reservas funcionen ni que sus tiempos de respuesta sean adecuados.

**Estado final del monitor:** Paused, verificado en UptimeRobot el 22/10/2026. Se pausó después de comprobar el incidente DOWN/UP y las notificaciones por correo, para evitar consultas periódicas que consuman la cuota gratuita de Render. El historial del incidente permanece disponible para la defensa.

### Sentry — Errores, rendimiento y uso

Se integró Sentry en el backend ASP.NET Core y en el frontend React mediante el PR #50.

El backend utiliza la variable de entorno `SENTRY_DSN`, una tasa de muestreo de trazas del 10 % y `SendDefaultPii=false`, para limitar el volumen de telemetría y evitar el envío predeterminado de información personal identificable.

El frontend utiliza `@sentry/react` y recibe su DSN durante la construcción de la aplicación.

Se verificó la recepción de trazas reales del backend en Sentry, incluidas solicitudes HTTP y operaciones de Entity Framework Core contra la base de datos.

El monitoreo externo permite saber si el servicio está disponible; Sentry aporta información sobre el comportamiento interno, los errores y la duración de las operaciones. Ambas herramientas se complementan.


**Error capturado en Issues:** Se verificó un evento `System.InvalidOperationException` con el mensaje `TP9 - Excepcion controlada para verificar Sentry`, registrado en el proyecto `reservas-backend` con un evento y estado New. La prueba se ejecutó desde una aplicación temporal de consola .NET 8, utilizando el SDK de Sentry y el entorno `tp9-prueba-local`. El envío se confirmó en los logs y posteriormente en Sentry Issues. Esta prueba demuestra la recepción de excepciones, pero no constituye un error generado por el backend desplegado. Evidencia: `evidencias/tp9/tp9-sentry-error.png`.

**Operación más utilizada y cantidad de solicitudes:** `GET /api/Reservas`, con un conteo estimado de 60 ejecuciones durante los últimos 14 días. Las otras operaciones observadas fueron `GET /api/Reservas/{id:int}` y `DELETE /api/Reservas/{id:int}`, con 10 ejecuciones estimadas cada una.

**Operación más lenta y P95:** `GET /api/Reservas`, con un P95 de 3,22 segundos. Las otras operaciones registraron un P95 de 68,90 ms para `GET /api/Reservas/{id:int}` y 137,34 ms para `DELETE /api/Reservas/{id:int}`.

El P95 representa el tiempo que aproximadamente el 95 % de las operaciones medidas no supera. Se compararon las transacciones HTTP agrupadas por `transaction` en Sentry Explore, filtrando el proyecto `reservas-backend` y un período de 14 días. Los resultados son estimaciones de Sentry basadas en 8 coincidencias de 26 spans, por lo que no representan necesariamente todas las solicitudes del sistema. Evidencia: `evidencias/tp9/tp9-sentry-metricas.png`.

### Feedback continuo y tablero

La observabilidad debe producir acciones concretas de mejora. A partir de la latencia observada se creó el Issue #53: [Investigar latencia de GET /api/Reservas detectada por Sentry](https://github.com/agussesin/ingsoft3-tp01/issues/53).

El Issue está vinculado al GitHub Project `IngSoft3 - Mi App DevOps` del TP3, en estado `Todo`. Propone investigar los tiempos del backend, las consultas a PostgreSQL y posibles demoras de infraestructura, además de repetir las mediciones con una muestra mayor.

La latencia observada es un hallazgo que requiere investigación; todavía no se confirmó su causa ni se implementó una optimización. Evidencia: `evidencias/tp9/tp9-feedback-project.png`.


### Problemas encontrados y resolución

Durante la configuración de Sentry, la API de QA no pudo desplegarse porque Render tenía configurada una etiqueta de imagen que no estaba disponible en GHCR.

Se corrigió la referencia de imagen y se desplegó la versión `sha-a881785ee70187bdeccecb07151a750b41063085`. Los logs confirmaron el arranque de ASP.NET Core en el entorno Staging y el endpoint `/health` respondió correctamente.

Esto demuestra que una configuración incorrecta del artefacto desplegado puede dejar un entorno sin servicio, aunque el código de la aplicación sea válido.

También se detectaron vulnerabilidades pendientes en dependencias de desarrollo del frontend. La actualización automática no se forzó después del error de npm, porque primero debe comprobarse la compatibilidad con los tests y el pipeline.

### Alcance y limitaciones

Las herramientas incorporadas cubren problemas diferentes:

- Dependabot identifica dependencias desactualizadas o con vulnerabilidades conocidas.
- CodeQL analiza posibles problemas de seguridad en código y workflows.
- Push protection busca impedir la publicación de secretos reconocibles.
- UptimeRobot detecta fallas de disponibilidad desde el exterior.
- Sentry permite investigar errores, duración y uso de operaciones instrumentadas.

Ninguna herramienta, individualmente, garantiza la seguridad o disponibilidad completa del sistema.

### Uso de asistencia de IA

Se utilizó asistencia de IA para comprender los conceptos de DevSecOps y observabilidad, orientar la configuración de Dependabot, CodeQL, UptimeRobot y Sentry, interpretar errores de npm y Render, y preparar esta documentación.

Los resultados se contrastaron con Pull Requests, checks de GitHub Actions, alertas de Security, historial de UptimeRobot, logs de Render, respuestas HTTP y trazas recibidas en Sentry.

Las verificaciones que todavía no se realizaron se documentan como pendientes y no como resultados obtenidos.

### Cierre y release

La versión `v9.0.0` se publicará después de completar las verificaciones exigidas, integrar la documentación mediante Pull Request y confirmar el commit de cierre.

El tag y la release deben identificar el estado real entregado del repositorio.


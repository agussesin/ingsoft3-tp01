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

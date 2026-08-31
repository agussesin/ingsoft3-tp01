# Evidencias - TP1 Ingeniería de Software III

## 1. Protección de la rama main

Se intentó realizar un push directamente sobre la rama `main`.  
La operación fue rechazada debido a la regla de protección configurada.

![Push rechazado](evidencias/push-rechazado.png)

---

## 2. Conflicto de merge detectado

Al intentar integrar la rama `feature/titulo-b`, GitHub detectó un conflicto con la rama `main`.

![Conflicto detectado](evidencias/conflicto-detectado.png)

---

## 3. Resolución del conflicto

El conflicto se produjo porque ambas ramas modificaban la misma línea del archivo `README.md`.  
Se resolvió seleccionando la versión correspondiente a `feature/titulo-b`.

![Resolución del conflicto](evidencias/resolucion-conflicto.png)

---

## 4. Merge completado

Luego de resolver el conflicto, el Pull Request pudo integrarse correctamente a la rama `main`.

![Merge completado](evidencias/conflicto-resuelto-merge.png)

---

## 5. Versión estable

Se creó el tag `v1.0.0` y se publicó la primera versión estable del TP mediante GitHub Releases.

![Versión estable](evidencias/version-estable.png)

## Evidencias del TP2 - Aplicacion de reservas

### Verificaciones realizadas

- El backend compilo correctamente con .NET 8.
- Las 4 pruebas automatizadas del backend finalizaron correctamente.
- Las 4 pruebas automatizadas del frontend finalizaron correctamente.
- ESLint no detecto errores.
- Vite genero correctamente la version de produccion.
- Se construyeron las imagenes del frontend y del backend.
- Docker Compose inicio correctamente el frontend, el backend y PostgreSQL.
- Se comprobo que los datos persisten al ejecutar `docker compose down`.
- Se comprobo que los datos se eliminan al ejecutar `docker compose down -v`.
- Las imagenes `v0.1.0` se publicaron en Docker Hub.
- El sistema se inicio correctamente descargando las imagenes publicadas.
- Se creo y consulto una reserva mediante la aplicacion levantada desde el registry.

### Aplicacion ejecutada desde Docker Hub

La siguiente captura demuestra que el frontend, el backend y PostgreSQL funcionan en conjunto utilizando las imagenes publicadas en Docker Hub:

![Aplicacion de reservas ejecutada desde imagenes publicadas](evidencias/registry-aplicacion-funcionando.png)

### Imagenes publicadas

- `agussesin/reservas-frontend:v0.1.0`
- `agussesin/reservas-backend:v0.1.0`

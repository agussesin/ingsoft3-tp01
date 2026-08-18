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
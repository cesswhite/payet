# Guía para agentes — Payet

Payet es una aplicación de una sola página para registrar pagos personales en el navegador. Usa Nuxt 3, Nuxt UI 2 y renderizado del cliente (`ssr: false`). No procesa pagos ni conecta con bancos.

- Empieza por [docs/REPOSITORY_GUIDE.md](docs/REPOSITORY_GUIDE.md); después lee sólo los archivos necesarios y sigue sus importaciones y llamadas de forma progresiva.
- Responde en el idioma del usuario y cita rutas y símbolos concretos. Distingue evidencia del código, inferencias y comportamiento pendiente de comprobar en ejecución.
- Una pregunta pide una explicación: no autoriza editar código, publicar ni cambiar configuración. Implementa únicamente cuando el usuario lo solicite.
- Los scripts, el código y `yarn.lock` tienen prioridad como evidencia sobre descripciones antiguas. Usa Yarn Classic y no generes otro lockfile por comodidad.
- Conserva el estado local de pagos, el canonical de `/` y el 404 de rutas desconocidas. No incluyas registros personales en ejemplos, logs, metadatos ni sitemaps.
- Documenta sólo nombres de variables de entorno, nunca valores secretos. No leas almacenamiento personal para explicar una función.
- Antes de un cambio solicitado, revisa `git status` y conserva trabajo concurrente. No cambies textos ni diseño visible como efecto secundario de documentación o SEO.
- Valida documentación mediante enlaces, rutas y comandos; no hace falta compilar por cambios sólo documentales. No declares pruebas exitosas si no se ejecutaron.

## Documentation upkeep

When commands, routes, storage or important flows change, update the affected section of `docs/REPOSITORY_GUIDE.md` in the same change. Keep this entry short and the Claude/Gemini wrappers importing it.

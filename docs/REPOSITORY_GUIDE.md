# Guía del repositorio — Payet

## Producto y ruta pública

Payet registra pagos personales: nombre, cantidad, fecha y estado pagado/pendiente. Permite agregar, quitar y cambiar el estado de un registro; calcula el total pendiente. La única página pública es `/` en `https://payet.ecostudios.dev/`. Se compone desde `app.vue`, sin directorio de páginas. Nuxt 3 y Nuxt UI 2 ejecutan la interfaz en el navegador porque `ssr: false` está configurado explícitamente.

## Mapa de código

Estas rutas son archivos del repositorio, no nuevas páginas públicas.

| Archivo de entrada | Responsabilidad |
| --- | --- |
| [app.vue](../app.vue) | Contenedor, selector de tema y composición de las tres secciones. |
| [components/Services/Add.vue](../components/Services/Add.vue) | Formulario, `validate` y `onSubmit`; crea un registro pendiente y limpia el formulario. |
| [components/Utils/Services.vue](../components/Utils/Services.vue) | Tabla pendiente, total, marcar pagado y quitar registro. |
| [components/Utils/ServicesDone.vue](../components/Utils/ServicesDone.vue) | Tabla pagada y acción para volver a pendiente. |
| [composables/services.ts](../composables/services.ts) | `services`, `addService`, `removeService`, `onDoneService`, `total`, filtros y persistencia local. |
| [types/index.ts](../types/index.ts) | Contrato `Service`: nombre, cantidad, estado y fecha. |
| [nuxt.config.ts](../nuxt.config.ts) | SPA, módulo UI, título, canonical y WebApplication JSON-LD. |
| [server/middleware/public-paths.ts](../server/middleware/public-paths.ts) | Rutas públicas permitidas y respuesta 404/noindex para desconocidas. |
| [app.config.ts](../app.config.ts) y [tailwind.config.ts](../tailwind.config.ts) | Configuración de tema y estilos. |

## Flujo y almacenamiento

`ServicesAdd.onSubmit` construye un `Service` y llama a `addService`. `useStorage` mantiene el array bajo la clave local `services`. Las tablas consumen `getUndoneServices` y `getDoneServices`; `onDoneService` alterna `done`, y `removeService` elimina por referencia al objeto. `total` suma sólo pendientes, convierte cantidades que lleguen como texto y omite valores no numéricos.

El estado está en el almacenamiento del navegador; no hay sincronización entre dispositivos ni respaldo de servidor. Borrar los datos del sitio puede eliminar los registros. No hay integración bancaria, cobros reales, cuentas de usuario, autenticación, API de pagos o base de datos en el código. La fecha se registra, pero no implementa una agenda de notificaciones. No confundir el total pendiente con análisis de gastos históricos o contabilidad completa.

## Comandos, entorno y validación

[package.json](../package.json) declara Node `22.x`; [yarn.lock](../yarn.lock) es un lockfile de Yarn Classic. Mantén ese gestor para evitar generar resoluciones paralelas. No hay configuración de GitHub Actions ni del proveedor de despliegue en el repositorio.

| Comando | Función |
| --- | --- |
| `yarn install --frozen-lockfile` | Instala la resolución existente; postinstall ejecuta Nuxt prepare. |
| `yarn dev` | Servidor de desarrollo. |
| `yarn build` | Build de producción. |
| `yarn preview` | Sirve el build existente. |
| `yarn generate` | Generación estática; revisar las necesidades del middleware antes de elegir este despliegue. |

No se declaran scripts de test, lint o typecheck ni una suite de pruebas. No inventes esos comandos ni instales herramientas como efecto secundario de una pregunta. Un cambio funcional requiere revisar agregar, alternar estado, quitar, total y restauración con datos de prueba, además del build según el alcance. Un cambio sólo documental se valida de forma estática.

El código no declara variables de entorno propias ni credenciales. No leas valores de archivos locales de entorno ni registros personales para explicar el producto.

## SEO y límites de privacidad

`nuxt.config.ts` define metadata pública y canonical de `/`; [robots.txt](../public/robots.txt) y [sitemap.xml](../public/sitemap.xml) permiten descubrir esa única página. `server/middleware/public-paths.ts` permite recursos de Nuxt y devuelve 404 con `X-Robots-Tag: noindex` para rutas desconocidas. [llms.txt](../public/llms.txt) ofrece contexto factual opcional a lectores compatibles; no es un requisito ni una garantía de indexación.

Al ser SPA, los metadatos iniciales no equivalen a contenido completo de la interfaz renderizado en servidor. No habilites SSR como supuesto arreglo menor: el almacenamiento local y las composables deben revisarse antes. No hay rutas privadas autenticadas; los pagos son datos locales que nunca deben incorporarse a metadata, sitemap, ejemplos públicos o logs. El estado real de indexación requiere evidencia externa.

## Cuatro preguntas de ejemplo

1. «¿Cómo se calcula lo que falta por pagar?» Empieza por `composables/services.ts::total` y `getUndoneServices`, después `components/Utils/Services.vue`.
2. «¿Dónde se guardan mis pagos y qué ocurre si borro el navegador?» Empieza por `composables/services.ts::services` y `nuxt.config.ts`; no inspecciones datos personales.
3. «¿Qué pasa cuando marco un servicio como pagado?» Sigue `Services.vue` → `onDoneService` → `getDoneServices` → `ServicesDone.vue`.
4. «¿Qué URL debe indexar Google y por qué una ruta inventada da 404?» Revisa `nuxt.config.ts`, `server/middleware/public-paths.ts` y `public/sitemap.xml`.

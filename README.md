📦 Entrega N°2 – API de Productos y Carritos + Handlebars + WebSockets

Servidor Node.js + Express con persistencia en archivos JSON, vistas con Handlebars y actualización en tiempo real mediante Socket.io.

🚀 Cómo iniciar el servidor
1) Instalar dependencias:
   npm install
2) Iniciar el servidor (entrypoint: server.js):
   npm start
Servidor disponible en http://localhost:8080

📁 Estructura del proyecto (resumen)
/managers
  ├─ product-manager.js
  └─ cart-manager.js
/routes
  ├─ products.router.js
  ├─ carts.router.js
  └─ views-router.js
/views
  ├─ home.handlebars
  ├─ realTimeProducts.handlebars
  └─ layouts/main.handlebars
/public
/data
  ├─ products.json
  └─ carts.json
server.js
README.md
package.json

🛒 Endpoints de Productos (/api/products)
✔ GET /              → lista todos los productos
✔ GET /:pid          → obtiene un producto por ID
✔ POST /             → crea un producto (id autogenerado) y emite actualización vía sockets
✔ PUT /:pid          → actualiza un producto (excepto id)
✔ DELETE /:pid       → elimina un producto y emite actualización vía sockets

🛍 Endpoints de Carritos (/api/carts)
✔ POST /                  → crea un carrito vacío
✔ GET /:cid               → devuelve productos del carrito
✔ POST /:cid/product/:pid → agrega producto (incrementa quantity si existe)

👀 Vistas con Handlebars
- GET /                 → `home.handlebars`: listado completo renderizado server-side.
- GET /realtimeproducts → `realTimeProducts.handlebars`: listado que se actualiza en vivo.

🔌 WebSockets (Socket.io)
- El servidor emite `products` con la lista completa al conectar y tras crear/eliminar.
- La vista `realTimeProducts` escucha `products` y refresca el `<ul>` sin recargar.
- El formulario en `realTimeProducts` envía eventos `newProduct` y `deleteProduct`.

🧪 Cómo probar
1) Ejecuta `npm start`.
2) Abre `http://localhost:8080/` para ver el listado inicial renderizado por Handlebars.
3) Abre `http://localhost:8080/realtimeproducts` en una o varias pestañas:
   - Completa el form y envía → se agrega y refresca en todas las pestañas.
   - Usa el botón Eliminar → se borra y refresca en todas las pestañas.
4) También puedes probar la API REST con Postman/Thunder Client usando los endpoints anteriores.

🧷 Notas
- Persistencia en `data/products.json` y `data/carts.json`.
- No enviar `id` en el body al crear productos o carritos.
- Layout principal: `views/layouts/main.handlebars`.


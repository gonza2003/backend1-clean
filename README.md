📦 Entrega N°1 – API de Productos y Carritos

Servidor desarrollado en Node.js + Express con persistencia en archivos JSON.
Permite gestionar productos y carritos mediante endpoints REST.

🚀 Cómo iniciar el servidor

Instalar dependencias:

npm install


Iniciar el servidor:

npm start


El servidor se ejecuta en:

http://localhost:8080

📁 Estructura del proyecto
/managers
  ├─ ProductManager.js
  └─ CartManager.js

/routes
  ├─ products.router.js
  └─ carts.router.js

/data
  ├─ products.json
  └─ carts.json

index.js
README.md
package.json

🛒 Endpoints de Productos (/api/products)
✔ GET /

Lista todos los productos.

✔ GET /:pid

Muestra un producto específico por ID.

✔ POST /

Crea un producto nuevo.
El id se autogenera.

Body ejemplo:

{
  "title": "Pizza Muzzarella",
  "description": "Pizza grande",
  "code": "PZ001",
  "price": 1500,
  "status": true,
  "stock": 10,
  "category": "pizzas",
  "thumbnails": []
}

✔ PUT /:pid

Actualiza un producto (excepto el ID).

✔ DELETE /:pid

Elimina un producto por ID.

🛍 Endpoints de Carritos (/api/carts)
✔ POST /

Crea un carrito nuevo vacío.
El id es autogenerado.

✔ GET /:cid

Muestra los productos del carrito.

✔ POST /:cid/product/:pid

Agrega un producto al carrito.
Si ya existe → incrementa quantity.

🧪 Cómo probar la API
🔹 1) Iniciar el servidor
npm start

🔹 2) Probar desde Postman o Thunder Client (VSCode)

Ejemplos:

➤ Listar productos:

GET

http://localhost:8080/api/products

➤ Crear producto:

POST

http://localhost:8080/api/products


Body JSON:

{
  "title": "Coca Cola",
  "description": "354 ml",
  "code": "CK001",
  "price": 900,
  "status": true,
  "stock": 30,
  "category": "bebidas"
}

➤ Crear carrito:

POST

http://localhost:8080/api/carts

➤ Agregar producto al carrito:

POST

http://localhost:8080/api/carts/{cid}/product/{pid}

🧷 Notas

La persistencia se realiza en products.json y carts.json.

No se debe enviar el id del producto o carrito desde el body.

No se implementa interfaz visual; la prueba se hace por Postman o Thunder Client.
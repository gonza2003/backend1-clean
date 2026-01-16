🛒 Proyecto Backend - Entrega Final (API de E-commerce)
Este proyecto es una API REST construida con Node.js y Express, diseñada para gestionar productos y carritos de compra, ahora con persistencia total en la nube utilizando MongoDB Atlas.

✨ Características Principales
Persistencia de Datos: Migración completa de FileSystem a MongoDB Atlas.

Gestión de Productos: CRUD completo para la administración de inventario.

Sistema de Carritos: Creación de carritos y gestión de productos dentro de los mismos.

Lógica de Cantidades: El sistema detecta si un producto ya existe en el carrito y aumenta su quantity en lugar de duplicarlo.

Populate: Integración de .populate() para obtener información detallada de los productos al consultar un carrito.

WebSockets: Actualización de productos en tiempo real mediante Socket.io.

Motor de Plantillas: Vistas dinámicas renderizadas con Handlebars.

🛠️ Tecnologías Utilizadas
Node.js & Express (Servidor)

MongoDB & Mongoose (Base de datos y modelado)

Socket.io (Comunicación en tiempo real)

Handlebars (Vistas)

Postman (Pruebas de API)

📂 Estructura del Proyecto
/models: Esquemas de Mongoose (cart.model.js, product.model.js).

/routes: Definición de endpoints para productos, carritos y vistas.

/managers: Clases para manejar la lógica de negocio y comunicación con la DB.

/public: Archivos estáticos (JS del lado del cliente, CSS).

/views: Plantillas de Handlebars.

🚀 Endpoints Principales
Productos (/api/products)
GET /: Lista todos los productos.

POST /: Agrega un nuevo producto.

Carritos (/api/carts)
POST /: Crea un nuevo carrito vacío.

GET /:cid: Muestra los productos de un carrito (con populate).

POST /:cid/product/:pid: Agrega un producto al carrito (suma cantidad si ya existe).

DELETE /:cid/product/:pid: Elimina un producto específico del carrito.

DELETE /:cid: Vacía el carrito por completo.

⚙️ Instalación y Uso
Clonar el repositorio.

Ejecutar npm install para instalar dependencias.

Configurar la conexión a MongoDB en el archivo database.js.

Iniciar el servidor con npm start.

El servidor correrá en http://localhost:8080.

💡 Notas del Desarrollador
En esta entrega se priorizó la robustez de la base de datos. Se implementó una lógica avanzada en el CartManager para asegurar que la comparación de IDs funcione correctamente incluso cuando los documentos están populados, evitando inconsistencias en los datos.
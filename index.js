const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

// Configuración de Base de Datos
const connectDB = require('./database'); 

// Rutas y Managers
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views-router');
const ProductManager = require('./managers/product-manager');

// Middlewares
const logger = require('./middlewares/logger-http');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = 8080;

// 1. Conexión a MongoDB Atlas
connectDB(); 

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares globales
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));

// Integración de Socket.io
app.set('io', io);

// Instancia de ProductManager (la actual que usa FS)
const pm = new ProductManager();

// Rutas base
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Manejo de Sockets
io.on('connection', async (socket) => {
  console.log('Cliente conectado', socket.id);
  const products = await pm.getProducts();
  socket.emit('products', products);

  socket.on('newProduct', async (data) => {
    await pm.addProduct(data);
    const updated = await pm.getProducts();
    io.emit('products', updated);
  });

  socket.on('deleteProduct', async (id) => {
    await pm.deleteProduct(id);
    const updated = await pm.getProducts();
    io.emit('products', updated);
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'API Productos & Carritos - Conectada a DB' });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const logger = require('./middlewares/logger-http');
const path = require('path');
const viewsRouter = require('./routes/views-router');
const ProductManager = require('./managers/product-manager');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = 8080;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));

// Integración de Socket.io
app.set('io', io);

// Product manager usado por los sockets
const pm = new ProductManager();

// Rutas base
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// manejar conexiones socket
io.on('connection', async (socket) => {
  console.log('Cliente conectado', socket.id);
  // enviar lista inicial de productos
  const products = await pm.getProducts(); // o importar ProductManager aquí
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
  res.json({ message: 'API Productos & Carritos - Entrega N°1' });
});

// Levantar el servidor HTTP (socket.io está ligado a httpServer)
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();
const PORT = 8080;

app.use(express.json());

// Rutas base
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API Productos & Carritos - Entrega N°1' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

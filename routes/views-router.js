const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/product-manager');
const pm = new ProductManager();

router.get('/', async (req, res) => {
  const products = await pm.getProducts();
  res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  // Podés renderizar sin datos y dejar que sockets carguen la lista
  res.render('realTimeProducts');
});

module.exports = router;
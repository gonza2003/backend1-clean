const express = require('express');
const CartManager = require('../managers/CartManager');
const router = express.Router();
const cm = new CartManager();

// POST /api/carts/  -> crear carrito nuevo
router.post('/', async (req, res) => {
  try {
    const cart = await cm.createCart();
    res.status(201).json(cart);
  } catch {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// GET /api/carts/:cid  -> listar productos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cm.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
  } catch {
    res.status(500).json({ error: 'Error al leer carrito' });
  }
});

// POST /api/carts/:cid/product/:pid  -> agregar producto (quantity 1 por default)
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const updatedCart = await cm.addProductToCart(req.params.cid, req.params.pid, 1);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

module.exports = router;

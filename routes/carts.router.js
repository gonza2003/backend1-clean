const express = require('express');
const CartManager = require('../managers/cart-manager');
const router = express.Router();
const cm = new CartManager();

console.log("--> El archivo carts.router.js ha sido cargado por Express"); // Log de carga

// POST /api/carts/  -> crear carrito nuevo
router.post('/', async (req, res) => {
  console.log("--> ¡ENTRANDO A LA RUTA POST /!");
  try {
    const cart = await cm.createCart();
    res.status(201).json({ status: 'success', payload: cart });
  } catch (err) {
    console.error("LOG DE ERROR EN ROUTER:", err); 
    res.status(500).json({ status: 'error', message: err.message });
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
    const { cid, pid } = req.params;
    console.log(`Intentando agregar producto ${pid} al carrito ${cid}`); // <-- Log de control
    
    const updatedCart = await cm.addProductToCart(cid, pid);
    
    if (!updatedCart) {
      console.log("No se encontró el carrito");
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    res.json(updatedCart);
  } catch (err) {
    console.error("Error detallado:", err); // <-- Esto nos dirá el motivo real
    res.status(500).json({ error: 'Error al agregar producto al carrito', details: err.message });
  }
});

module.exports = router;

const express = require('express');
const ProductManager = require('../managers/product-manager');
const router = express.Router();
const pm = new ProductManager(); // por defecto data/products.json
const productValidator = require('../middlewares/product-validator');

// GET /api/products/   -> listar todos
router.get('/', async (req, res) => {
  try {
    const products = await pm.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al leer productos' });
  }
});

// GET /api/products/:pid  -> traer 1
router.get('/:pid', async (req, res) => {
  try {
    const product = await pm.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch {
    res.status(500).json({ error: 'Error al leer producto' });
  }
});

// POST /api/products/  -> crear
router.post('/', async (req, res) => {
  try {
    const newP = await pm.addProduct(req.body);
    // emitir usando io guardado en app
    const io = req.app.get('io');
    if (io) io.emit('products', await pm.getProducts());
    res.status(201).json(newP);
  } catch {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// PUT /api/products/:pid  -> actualizar (no modificar id)
router.put('/:pid', async (req, res) => {
  try {
    const updated = await pm.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  try {
    const deleted = await pm.deleteProduct(req.params.pid);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });

    // emitir actualización a clientes websocket
    const io = req.app.get('io');
    if (io) io.emit('products', await pm.getProducts());

    res.json({ message: 'Producto eliminado' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;

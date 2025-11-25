const fs = require('fs').promises;
const path = require('path');

class CartManager {
  constructor(filename = 'data/carts.json') {
    this.path = path.resolve(filename);
    this._ensureFile();
  }

  async _ensureFile() {
    try {
      await fs.access(this.path);
    } catch {
      await fs.writeFile(this.path, JSON.stringify([]));
    }
  }

  async _readFile() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async _writeFile(items) {
    await fs.writeFile(this.path, JSON.stringify(items, null, 2));
  }

  _generateId() {
    return Date.now().toString() + Math.random().toString(36).slice(2, 8);
  }

  async createCart() {
    const carts = await this._readFile();
    const id = this._generateId();
    const newCart = { id, products: [] };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async getCartById(cid) {
    const carts = await this._readFile();
    return carts.find(c => String(c.id) === String(cid)) || null;
  }

  // Agrega producto (por id) incrementando quantity si ya existe
  async addProductToCart(cid, pid, qty = 1) {
    const carts = await this._readFile();
    const idx = carts.findIndex(c => String(c.id) === String(cid));
    if (idx === -1) return null;

    const cart = carts[idx];
    const prodIndex = cart.products.findIndex(p => String(p.product) === String(pid));
    if (prodIndex === -1) {
      cart.products.push({ product: String(pid), quantity: Number(qty) });
    } else {
      cart.products[prodIndex].quantity = Number(cart.products[prodIndex].quantity) + Number(qty);
    }

    carts[idx] = cart;
    await this._writeFile(carts);
    return cart;
  }
}

module.exports = CartManager;

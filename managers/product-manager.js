const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor(filename = 'data/products.json') {
    this.path = path.resolve(filename);
    this._ensureFile();
  }

  async _ensureFile() {
    try {
      await fs.access(this.path);
    } catch {
      // Si no existe, crearlo con array vacío
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

  async getProducts() {
    return await this._readFile();
  }

  async getProductById(pid) {
    const products = await this._readFile();
    return products.find(p => String(p.id) === String(pid)) || null;
  }

  async addProduct(productData) {
    const products = await this._readFile();

    // Generar id automáticamente
    const id = this._generateId();

    const newProduct = {
      id,
      title: productData.title || '',
      description: productData.description || '',
      code: productData.code || '',
      price: Number(productData.price) || 0,
      status: productData.status === undefined ? true : Boolean(productData.status),
      stock: Number(productData.stock) || 0,
      category: productData.category || '',
      thumbnails: Array.isArray(productData.thumbnails) ? productData.thumbnails : []
    };

    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async updateProduct(pid, updates) {
    const products = await this._readFile();
    const idx = products.findIndex(p => String(p.id) === String(pid));
    if (idx === -1) return null;

    // No permitir cambiar el id
    const { id, ...rest } = updates;
    products[idx] = { ...products[idx], ...rest };
    await this._writeFile(products);
    return products[idx];
  }

  async deleteProduct(pid) {
    const products = await this._readFile();
    const filtered = products.filter(p => String(p.id) !== String(pid));
    if (filtered.length === products.length) return false;
    await this._writeFile(filtered);
    return true;
  }
}

module.exports = ProductManager;

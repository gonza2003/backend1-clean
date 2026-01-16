const productModel = require('../models/product.model');

class ProductManager {
  constructor() {}

async getProducts(filter = {}, options = {}) {
  // paginate recibe: 
  // 1. El filtro (ej: { category: 'celulares' })
  // 2. Las opciones (ej: { limit: 10, page: 1 })
  return await productModel.paginate(filter, options);
}

  async getProductById(pid) {
    return await productModel.findById(pid);
  }

  async addProduct(productData) {
    // MongoDB crea el ID y valida los campos automáticamente según tu Schema 📝
    return await productModel.create(productData);
  }

  async updateProduct(pid, updates) {
    return await productModel.findByIdAndUpdate(pid, updates, { new: true });
  }

  async deleteProduct(pid) {
    return await productModel.findByIdAndDelete(pid);
  }
}

module.exports = ProductManager;
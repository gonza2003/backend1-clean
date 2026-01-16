const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products' // Debe coincidir con el nombre de tu colección de productos
      },
      quantity: { type: Number, default: 1 }
    }
  ]
});

// Middleware: Antes de cualquier find, hace el populate automáticamente 🔗
cartSchema.pre(['find', 'findOne'], function() {
  this.populate('products.product');
});

const cartModel = mongoose.model('carts', cartSchema);
module.exports = cartModel;
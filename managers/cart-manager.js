const cartModel = require('../models/cart.model');

class CartManager {
  // Crear un carrito nuevo vacío
  async createCart() {
  console.log("Intentando crear carrito en MongoDB..."); // Log de control
  try {
    const nuevoCarrito = await cartModel.create({ products: [] });
    console.log("Carrito creado con éxito:", nuevoCarrito);
    return nuevoCarrito;
  } catch (error) {
    console.error("Error específico dentro del Manager:", error);
    throw error; // Re-lanzamos el error para que el router lo atrape
  }
}

  // Buscar un carrito y "llenar" los datos de los productos (Populate)
  async getCartById(cid) {
    // .populate('products.product') transforma los IDs en el objeto completo del producto 📦
    return await cartModel.findById(cid).populate('products.product').lean();
  }

  // Agregar un producto al carrito
  // Agregar un producto al carrito
  async addProductToCart(cid, pid) {
    // 1. Buscamos el carrito
    const cart = await cartModel.findById(cid);
    if (!cart) return null;

    // 2. ¿El producto ya está en el carrito? 🧐
    // Usamos esta lógica para comparar correctamente IDs, tengan Populate o no
    const productInCart = cart.products.find(p => {
      const existingId = p.product._id ? p.product._id.toString() : p.product.toString();
      return existingId === pid;
    });

    if (productInCart) {
      // Si ya existe, solo aumentamos la cantidad 📈
      productInCart.quantity++;
    } else {
      // Si es nuevo, lo agregamos al array 🆕
      cart.products.push({ product: pid, quantity: 1 });
    }

    // 3. Guardamos los cambios en la base de datos 💾
    return await cart.save();
  }
  
  // Borrar un producto específico del carrito
async removeProductFromCart(cid, pid) {
  // Usamos $pull para "tirar" o sacar el elemento del array que coincida con el ID
  return await cartModel.findByIdAndUpdate(
    cid,
    { $pull: { products: { product: pid } } },
    { new: true }
  );
}

// Vaciar el carrito (dejar el array de productos vacío)
async clearCart(cid) {
  return await cartModel.findByIdAndUpdate(
    cid,
    { $set: { products: [] } },
    { new: true }
  );
}
}

module.exports = CartManager;
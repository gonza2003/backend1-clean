const mongoose = require('mongoose'); // Cambiamos import por require para ser consistentes

const connectionString = 'mongodb+srv://gonzamungiello479_db_user:Bokitapasion1@coderhouse.ovxebzj.mongodb.net/ecommerce?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Conectado con éxito a MongoDB Atlas ☁️");
    } catch (error) {
        console.error("Error al conectar a la base de datos ❌", error);
        process.exit(1);
    }
};

// Esta es la única forma de exportar que necesitamos aquí
module.exports = connectDB;
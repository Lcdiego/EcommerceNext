import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Por favor, define la variable MONGO_URI en el archivo .env.local");
}

let isConnected; // Variable para rastrear el estado de la conexión
 const conectarDB = async () => {
  if (isConnected) {
    console.log("Ya conectado a MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
     
    });

    isConnected = db.connections[0].readyState;
    console.log(`Conectado a MongoDB: ${db.connection.host}`);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    throw new Error("No se pudo conectar a la base de datos");
  }
};
export default conectarDB
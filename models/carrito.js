import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    sectionHome: { type: String },
    category: { type: String, required: true },
    imagePath: { type: String, default: null },
    gallery: { type: [String], default: [] },
    cantidad: { type: Number, default: 1 }
  }, { timestamps: true });
  const Carrito = mongoose.models.Carrito || mongoose.model('Carrito', carritoSchema);

export default Carrito;

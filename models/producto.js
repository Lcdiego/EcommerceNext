import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: {type: Number , requerid:true},
  sectionHome: { type: String, requerid:true},
  category: { type: String, required: true },
  imagePath: { type: String, default: null },
  gallery: { type: [String], default: [] },
}, { timestamps: true });

const Product = mongoose.models.todosProductos || mongoose.model('todosProductos', productSchema);

export default Product;
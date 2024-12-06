import connectDB from '../../../../../lib/db';
import Product from "../../../../../models/producto";
import axios from "axios";
import mongoose from "mongoose";
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "productos_preset");

  console.log("Subiendo archivo a Cloudinary:", file);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error en Cloudinary:", error.response?.data || error.message);
    throw new Error("Error al subir la imagen a Cloudinary");
  }
};

export async function GET(req, { params }) {
  const { id } = await params; // Acceso directo
  await connectDB();

  try {
    const product = await Product.findById(id);
    if (!product) {
      return new Response(JSON.stringify({ message: "Producto no encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify({ product }), { status: 200 });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return new Response(JSON.stringify({ message: "Error al obtener el producto" }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } =await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(
        JSON.stringify({ message: "ID inválido, no es un ObjectId" }),
        { status: 400 }
    );
}

  await connectDB();

  try {
   
    const { name, price, description, sectionHome, category, stock, image, gallery } = await req.json();

    if (!name || !price || !description || !sectionHome || !category || !stock) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son obligatorios" }),
        { status: 400 }
      );
    }

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadToCloudinary(image);
    }

    let galleryUrls = [];
    if (gallery && Array.isArray(gallery)) {
      galleryUrls = await Promise.all(
        gallery.map(async (file) => {
          return await uploadToCloudinary(file);
        })
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        sectionHome,
        category,
        stock,
        imagePath: imageUrl || undefined,
        gallery: galleryUrls.length ? galleryUrls : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return new Response(
        JSON.stringify({ message: "Producto no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ product: updatedProduct, message: "Producto actualizado correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), { status: 500 });
  }
}

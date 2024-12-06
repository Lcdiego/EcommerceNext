import cloudinary from '../../../../lib/cloudinary';
import connectDB from '../../../../lib/db';
import Product from '../../../../models/producto';
import { authMiddleware,adminMiddleware } from 'app/utils/authMilddleware';

export const POST = async (req) => {
  try {
    
    const { name, price, description, sectionHome, stock, category, image, gallery } = await req.json();

    await connectDB();
 // Autenticación
 const authResult = await authMiddleware(req);
 if (authResult) return authResult; // Si la autenticación falla, devolver el error

 // Autorización de administrador
 const adminResult = await adminMiddleware(req);
 if (adminResult) return adminResult; // Si la autorización falla, devolver el error
    
    // Subir imagen principal a Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, { folder: "products" });
    const imagePath = uploadResponse.secure_url;

    // Subir galería a Cloudinary
    const galleryPaths = [];
    for (const img of gallery) {
      const res = await cloudinary.uploader.upload(img, { folder: "products/gallery" });
      galleryPaths.push(res.secure_url);
    }

    // Crear producto en MongoDB
    const product = new Product({
      name,
      price,
      description,
      sectionHome,
      stock,
      category,
      imagePath,
      gallery: galleryPaths,
    });

    await product.save();

    return new Response(JSON.stringify({ product, message: 'Producto ingresado' }), { status: 201 });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

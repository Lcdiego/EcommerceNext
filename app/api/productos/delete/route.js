import connectDB from '../../../../lib/db';
import Product from '../../../../models/producto';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Faltan datos necesarios' }, { status: 400 });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    const updatedProducts = await Product.find();
    return NextResponse.json(updatedProducts);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

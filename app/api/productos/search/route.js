import connectDB from '../../../../lib/db';
import Product from '../../../../models/producto';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';

  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
    });

    if (products.length === 0) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
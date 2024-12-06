import connectDB from '../../../../lib/db';
import Producto from '../../../../models/producto';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  try {
    const productos = await Producto.find();
    return NextResponse.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

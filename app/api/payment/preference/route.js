import connectDB from '../../../../lib/db';
import Product from '../../../../models/Usuario';
import mercadopago from 'mercadopago';
import { NextResponse } from 'next/server';

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

export async function POST(req) {
  await connectDB();

  const { data, id } = await req.json();

  try {
    const product = await Product.findById(data);

    if (!product || id) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    const preference = {
      items: [
        {
          title: product.name,
          quantity: 1,
          unit_price: Number(product.price),
        },
      ],
      back_urls: {
        success: '/',
        failure: '/',
        pending: 'http://localhost:3000/pending',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);

    return NextResponse.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

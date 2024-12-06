import { NextResponse } from 'next/server';
import Carrito from '../../../models/carrito';
import Producto from '../../../models/producto';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import connectMongo from '../../../lib/db'



const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc',
  },
});

const pre = new Preference(client);

export async function POST(req) {
  const { userId, productId } = await req.json();

  try {
    // Verificar si el producto existe en la colección de productos
    const producto = await Producto.findById(productId);
    if (!producto) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    // Verificar si el producto ya está en el carrito del usuario
    const carritoExistente = await Carrito.findOne({ userId, productId });

    if (carritoExistente) {
      // Si el producto ya está en el carrito, incrementar la cantidad y actualizar el precio
      const cantidad = carritoExistente.cantidad += 1;
      carritoExistente.price = producto.price * cantidad;
      await carritoExistente.save();
      return NextResponse.json({ message: 'Cantidad y precio actualizados en el carrito', carritoItem: carritoExistente });
    } else {
      // Si el producto no está en el carrito, agregarlo como nuevo item
      const carritoItem = new Carrito({
        userId,
        productId: producto._id,
        name: producto.name,
        price: producto.price,
        description: producto.description,
        sectionHome: producto.sectionHome,
        category: producto.category,
        imagePath: producto.imagePath,
        gallery: producto.gallery,
        cantidad: 1,
      });

      await carritoItem.save();
      return NextResponse.json({ message: 'Producto agregado al carrito', carritoItem }, { status: 201 });
    }
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    return NextResponse.json({ message: 'Error al agregar al carrito' }, { status: 500 });
  }
}

export async function PUT(req) {
  const { userId, productId, cantidad } = await req.json();

  try {
  

    const carritoItem = await Carrito.findOne({ userId, productId });

    if (!carritoItem) {
      console.error('Producto no encontrado en el carrito');
      return NextResponse.json({ msg: 'Producto no encontrado en el carrito' }, { status: 404 });
    }

    const producto = await Producto.findById(productId);
    if (!producto) {
      return NextResponse.json({ message: 'Producto no encontrado en la colección de productos' }, { status: 404 });
    }

    carritoItem.cantidad = cantidad;
    carritoItem.price = producto.price * cantidad;
    await carritoItem.save();
    return NextResponse.json({ cantidad: carritoItem.cantidad, price: carritoItem.price });
  } catch (error) {
    console.error('Error al actualizar la cantidad', error);
    return NextResponse.json({ msg: 'Error al actualizar la cantidad', error }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectMongo();
  const { userId, productId } = await req.json();

  if (!userId || !productId) {
    return NextResponse.json({ message: 'Faltan datos necesarios' }, { status: 400 });
  }

  try {
    const productoEliminado = await Carrito.findOneAndDelete({ userId, productId });

    if (!productoEliminado) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    const carritoActualizado = await Carrito.find({ userId });
    return NextResponse.json(carritoActualizado);
  } catch (error) {
    console.error('Error al eliminar producto del carrito', error);
    return NextResponse.json({ message: 'Error al eliminar producto del carrito' }, { status: 500 });
  }
}

// Modelo Carrito

export async function GET(req) {
  try {
    await connectMongo();

    // Obtener el `userId` de los parámetros de consulta
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'userId es requerido' }, { status: 400 });
    }

    // Buscar productos del carrito para el usuario
    const carrito = await Carrito.find({ userId });

    return NextResponse.json(carrito, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return NextResponse.json({ message: 'Error al obtener el carrito', error }, { status: 500 });
  }
}

export async function POST_PreferenciaPago(req) {
  const { data } = await req.json();
  console.log('IDs recibidos:', data);

  try {
    const productos = await Carrito.find({ 'productId': { $in: data } });
    console.log('Productos encontrados:', productos);

    if (!productos.length) {
      return NextResponse.json({ message: 'Productos no encontrados' }, { status: 404 });
    }

    const preferenceData = {
      payer: { email: 'payer@example.com' },
      payment_method_id: 'visa',
      items: productos.map(item => ({
        id: item._id,
        description: item.description,
        title: item.name,
        quantity: 1,
        unit_price: Number(item.price),
      })),
      back_urls: {
        success: 'http://localhost:5173/',
        failure: 'http://localhost:5173/',
        pending: 'http://localhost:5173/pending',
      },
      auto_return: 'approved',
    };

    console.log('Datos de preferencia:', JSON.stringify(preferenceData, null, 2));

    const response = await pre.create({ body: preferenceData });
    console.log('Respuesta completa:', response);

    if (response && response.init_point) {
      return NextResponse.json({ init_point: response.init_point });
    } else {
      console.error('Error: La respuesta no contiene init_point', response);
      return NextResponse.json({ error: 'La respuesta no contiene init_point' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    return NextResponse.json({ error: 'Error al crear la preferencia' }, { status: 500 });
  }
}

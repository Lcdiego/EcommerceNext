'use client'

import Link from 'next/link';
import { ProductoContext } from '../contex/contex';
import { useContext } from 'react';
import Image from 'next/image';


const ProductosExclusivos = () => {

    const { productos, agregarCarrito, pagos, SeleccionarProducts } = useContext(ProductoContext)

    const productoExclusivo = productos.filter((producto) => producto.sectionHome === 'Producto Exclusivo')

    return (
        <div className='my-10'>
            <div className=' border-b-2 border-b-gray-200 flex flex-col sm:flex-row sm:justify-between'>
                <h1 className='ml-5 xl:mx-40 text-lg sm:text-2xl'>Productos Exclusivos</h1>

            </div>


            <div className='mt-5 sm:mx-40 flex justify-center gap-4 flex-wrap'>
                {productoExclusivo.map((producto) => (
                    <div key={producto._id} className=" relative flex w-72 h-1/2 flex-col  rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className=' flex justifi-center '>
                            <div className="relative mx-4 mt-4 w-full h-[27vh] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                <Link href="/pages/DetalleProductos"onClick={() => SeleccionarProducts(producto)}>
                                   
                                        <Image
                                            src={`${producto.imagePath}`}
                                            alt={producto.name} 
                                            width={500} 
                                            height={500} 
                                            className="h-full w-full object-contain"
                                        />
                                    
                                </Link>
                            </div>
                        </div>

                        <div className=" p-6 h-48">
                            <div className=" h-full mb-5 flex flex-col justify-between ">
                                <div>
                                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                        {producto.name}
                                    </p>
                                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                        Precio: $-{producto.price}
                                    </p>
                                </div>
                                <button
                                    className="block w-full select-none rounded-lg bg-blue-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    onClick={() => { agregarCarrito(producto._id) }}
                                >
                                    Agregar al carrito
                                </button>
                                <button
                                    className="block w-full select-none rounded-lg bg-blue-500/70 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    onClick={() => { pagos(producto._id) }}
                                >
                                    Comprar
                                </button>

                            </div>

                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default ProductosExclusivos 
'use client'
import { useContext } from 'react';
import { ProductoContext } from '../../components/contex/contex';
import Link from 'next/link';
import Image from 'next/image';
const TodosProductos = () => {
    const { productos, loading, agregarCarrito, SeleccionarProducts, pagos, initPoint } = useContext(ProductoContext);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    console.log('URL de la imagen:', productos.image);



    return (
        <div className='2xl:mx-40 '>
            <div className=' border-b-2 border-b-gray-200 flex flex-col sm:flex-row sm:justify-between '>
                <h1 className='text-2xl ml-5 mt-60 mb-10 sm:mt-48'> Todos los Productos</h1>
              
            </div>


            <div className='flex justify-center flex-wrap'>
                {productos.map((producto) => (
                    <div key={producto._id} className="m-5 relative flex w-72 h-1/2 flex-col  rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className=' flex justifi-center '>
                            <div className="relative mx-4 mt-4 w-full h-[27vh] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                <Link href={'/pages/DetalleProductos'} onClick={() => SeleccionarProducts(producto)}>
                                    <Image
                                        src={producto.imagePath} // URL completa de Cloudinary
                                        alt={producto.name}
                                        width={500} // Ajusta según tus necesidades
                                        height={500} // Ajusta según tus necesidades
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
                                <Link href={initPoint}>
                                    <button
                                        className="block w-full select-none rounded-lg bg-blue-500/70 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        onClick={() => { pagos(producto._id) }}
                                    >
                                        Comprar
                                    </button>
                                </Link>


                            </div>

                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default TodosProductos 
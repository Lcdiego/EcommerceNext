'use client'
import { useContext } from 'react';
import { ProductoContext } from '../../components/contex/contex';
import Link from 'next/link';
import Image from 'next/image';


const SearchInput = () => {

    const { SearchResult, agregarCarrito, SeleccionarProducts, pagos } = useContext(ProductoContext)

    

    return (
        <div className='flex justify-center flex-wrap mx-40'>
            {SearchResult.length === 0 && <p className='text-black mt-80 text-2xl'>No se encontraron productos.</p>}
            <div className='sm:w-full flex  sm:justify-between flex-wrap mt-60'>
                {SearchResult.map((producto) => (
                    <div key={producto._id} className="my-10 relative flex w-72  flex-col  rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className=' flex justifi-center '>
                            <div className="relative mx-4 mt-4 w-full h-[27vh] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                <Link href={'/detalle-products'} onClick={() => { SeleccionarProducts(producto) }}>
                                    <Image
                                        width={200}
                                        height={200}
                                        alt=''
                                        src={`${producto.imagePath}`}
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

export default SearchInput 
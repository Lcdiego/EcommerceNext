'use client'
import { useContext, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { ProductoContext } from "../contex/contex";
import Link from "next/link";
import Image from "next/image";


const OfertaDelDia = () => {
    const { productos, agregarCarrito, pagos, SeleccionarProducts } = useContext(ProductoContext);

    const [currentIndex, setCurrentIndex] = useState(0);

    const OfertaDelDia = productos.filter((producto) => producto.sectionHome === 'Oferta del dia')

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? OfertaDelDia.length - 2 : prevIndex - 2));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= OfertaDelDia.length - 2 ? 0 : prevIndex + 2));
    };



    return (
        <div className="mb-10">
            <div className=" sm:mb-20 border-b-2 border-b-gray-200 flex justify-between">
                <div className="flex items-end">
                    <h1 className="ml-5 xl:mx-40 text-lg sm:text-2xl text-black">
                        Oferta del día
                    </h1>
                </div>
                <div className="mr-5 xl:mx-40">
                    <button onClick={prevSlide} className=" bg-opacity-50 text-blue-500 rounded-full hover:bg-blue-300 hover:text-white text-3xl p-2 mr-2">
                        <IoIosArrowBack />
                    </button>
                    <button onClick={nextSlide} className=" bg-opacity-50 text-blue-500 rounded-full hover:bg-blue-300 hover:text-white text-3xl p-2">
                        <IoIosArrowForward />
                    </button>
                </div>

            </div>
            <div className="relative mx-auto max-w-2xl  overflow-hidden">

                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
                    <div className='flex justify-center'>
                        {OfertaDelDia.map((producto) => (
                            <div key={producto._id} className=" m-5 relative flex w-96  sm:w-72  flex-col  rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                <div className=' flex justifi-center '>
                                    <div className="relative mx-4 mt-4 w-full h-[27vh] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                        <Link href='/pages/DetalleProductos'onClick={() => SeleccionarProducts(producto)}>
                                      
                                                <Image
                                                    src={`${producto.imagePath}`}
                                                    alt={producto.name} // Agrega un alt para accesibilidad
                                                    width={500} // Ancho de la imagen
                                                    height={500} // Alto de la imagen
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
            </div>
        </div>

    );
}

export default OfertaDelDia;
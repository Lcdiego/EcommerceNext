'use client'
import { useContext, useState } from "react";
import { ProductoContext } from "../../components/contex/contex";
import OfertaDelDia from "../OfertaDelDia/OfertaDelDia";
import FuturosProductos from "../FuturosProductos/FuturosProductos";
import ProductosExclusivos from "../ProductosExclusivos/ProductosExclusivos";
import Link from "next/link";
import Image from "next/image";

const Main = () => {
  const { agregarCarrito, pagos, productos, SeleccionarProducts } = useContext(ProductoContext)
  const [currentIndex, setCurrentIndex] = useState(0);


  const productosSeccion = productos.filter(producto => producto.sectionHome === 'Carrusel');
const cards= productos.filter(card=> card.sectionHome === 'Encabezado');
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? productosSeccion.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((nextIndex) => (nextIndex === productosSeccion.length - 1 ? 0 : nextIndex + 1));
  };



  return (
    <div>
      <div className="mx-2 sm:mx-5 pt-60 pb-10 flex flex-col items-center xl:flex-row 2xl:mx-40">
        <div className="relative  xl:mx-auto h-[29rem] sm:h-[29rem] max-w-full sm:max-w-full 2xl:h-[28rem] lg:max-w-[43rem]  overflow-hidden">
          <div className="flex h-full w-full transition-transform duration-500 flex-nowrap" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {productosSeccion.map((producto) => (
              <div key={producto._id} className="w-full flex-col-reverse sm:flex-row flex-shrink-0 flex items-center relative rounded-xl bg-white bg-clip-border text-gray-700 border box-border">
                <div className="w-80 h-60 mt-10 sm:w-80 sm:h-full flex flex-col justify-evenly sm:border-x rounded-l-lg">
                  <div className="sm:p-6 flex flex-col mx-2">
                    <div className="mb-2">
                      <p className="block font-sans text-sm md:text-xl  font-medium leading-relaxed text-blue-gray-900 antialiased sm:p-3">
                        {producto.name}
                      </p>
                      <p className="block font-sans text-sm  md:text-xl font-medium leading-relaxed text-blue-gray-900 antialiased sm:p-3">
                        $: {producto.price}
                      </p>

                    </div>
                  </div>
                  <div className="mx-2 sm:m-0  pt-0 sm:p-6">
                    <button
                      className="block w-full py-3 select-none rounded-sm sm:rounded-lg bg-blue-200 sm:py-3 sm:px-6 text-center align-middle font-sans text-[10px] font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => { agregarCarrito(producto._id) }}
                    >
                      Agregar al carrito
                    </button>

                    <button
                      className="block w-full py-3 select-none mt-1 rounded-sm sm:rounded-lg bg-blue-500/70 sm:py-3 px-6 text-center align-middle font-sans text-[10px] font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => { pagos(producto._id) }}
                    >
                      Comprar
                    </button>
                  </div>

                </div>
                <div className="w-full sm:h-3/4 sm:w-[50vh] lg:w-[63vw] xl:w-[20vw] mx-4 mt-4 overflow-hidden bg-white bg-clip-border text-gray-700">
                  <Link href="/pages/DetalleProductos" onClick={() => SeleccionarProducts(producto)}>

                    <Image
                      src={producto.imagePath}
                      alt={producto.name}
                      width={500}
                      height={500}
                      className="h-full w-full object-contain hover:scale-105 transition-all"
                    />

                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button onClick={prevSlide} className="absolute  left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-0.5 sm:p-2">
            &lt;
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-0.5 sm:p-2">
            &gt;
          </button>
        </div>



        <div className="flex sm:ml-0 sm:flex flex-col items-center">
          <div className=" xl:pb-7 2xl:pb-0 pt-6 xl:pt-0 xl:mr-20">
          {cards.map((card)=>(
            <div  key={card._id} className="flex my-5 max-w-sm sm:max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
            
              <div className =" h-full" >
                <Image width={200} height={300} src={card.imagePath} alt="" />
              </div>
              <div className="w-2/3 p-4">
                <h1 className="text-gray-900 font-bold text-2xl">Backpack</h1>
                <p className="mt-2 text-gray-600 text-sm">{card.name}</p>
                <div className="flex item-center mt-2">
                  <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </div>
                <div className="mt-3">
                  <h1 className="text-gray-700 font-bold text-xl">{card.price}</h1>
                </div>
                <div className="flex item-center  mt-3">


                  <div className="w-full flex justify-around mx-2 sm:m-0  pt-0 ">

                    <button
                      className="   select-none rounded-sm sm:rounded-lg bg-blue-200  sm:px-6 text-center align-middle font-sans text-[10px] font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => { agregarCarrito(card._id) }}
                    >
                      Agregar al carrito
                    </button>

                    <button
                      className=" select-none rounded-sm sm:rounded-lg bg-blue-500/70 sm:py-3 px-6 text-center align-middle font-sans text-[10px] font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => { pagos(card._id) }}
                    >
                      Comprar
                    </button>
                 
                  </div>
                
                </div>
             
              </div>
              
            </div>
             ))}
          </div>


        </div>
      </div>
      <div>
        <ProductosExclusivos />
      </div>
      <div>
        <OfertaDelDia />
      </div>
      <div>
        <FuturosProductos />
      </div>

    </div>


  );
};

export default Main;

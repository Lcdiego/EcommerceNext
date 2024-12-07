'use client'

import { useContext, useEffect, useState } from "react";
import { ProductoContext } from "../../components/contex/contex";
import Link from "next/link";
import Image from "next/image";
import { showCartAlertEliminar } from "../../components/showCartAlert/showCartAlert";

const Carrito = () => {
  const { carrito, eliminarProducto, actualizarCantidad, pagosCarrito } = useContext(ProductoContext);

  const [precioTotal, setPrecioTotal] = useState(0);
  const productId = carrito.map((item) => item.productId)
  console.log(productId);

  useEffect(() => {
    const total = carrito.reduce((acc, item) => acc + item.price, 0);
    setPrecioTotal(total);
  }, [carrito]);
  const handleCantidadChange = (productId, cantidad) => {
    actualizarCantidad(productId, cantidad);
  };

  return (
    <div className="w-full h-full " id="chec-div">
      <div className=" transform translate-x-0 transition ease-in-out duration-700" id="checkout">
        <div className=" flex  lg:flex-row flex-col justify-end" id="cart">
          <div className="mt-60 sm:mt-32 lg:w-1/2 md:w-full w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-y-hidden overflow-x-hidden lg:h-auto h-auto" id="scroll">
            <div className="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
              <Link href={'/'}>
                <p className="text-sm pl-2 leading-none dark:hover:text-gray-200">Atras</p>
              </Link>
            </div>
            <p className="lg:text-4xl text-3xl font-semibold leading-10 text-gray-800 dark:text-white pt-3">Carrito</p>
            {carrito.map((item) => (
              <div key={item._id} className=" md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
                <div className="md:w-4/12 h-40 2xl:w-1/6 w-full">
                  <Image width={500} height={500} src={`${item.imagePath}`} alt="Black Leather Bag" className="h-full object-center object-contain md:block " />
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">

                  <div className="flex items-center justify-between w-full pt-1">
                    <p className="text-base font-black leading-none text-gray-800 dark:text-white">{item.name}</p>
                    <select
                      aria-label="Select quantity"
                      className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                      value={item.cantidad}
                      onChange={(e) => handleCantidadChange(item.productId, parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">{item.description}</p>
                  <p className="text-xs leading-3 text-gray-600 dark:text-white py-4">Color: Black</p>
                  <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white">Composition: 100% calf leather</p>
                  <div className="flex items-center justify-between pt-5">
                    <div className="flex items-center">
                      <p className="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Add to favorites</p>
                      <p onClick={() => {showCartAlertEliminar(eliminarProducto,productId) }} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Eliminar</p>
                    </div>
                    <p className="text-base font-black leading-none text-gray-800 dark:text-white">$ {item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" sticky top-0 lg:w-96 md:w-full w-full bg-gray-100 dark:bg-gray-900 h-full">
            <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
              <div>
                <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">Resumen</p>
                <div className="flex items-center justify-between pt-16">
                  <p className="text-base leading-none text-gray-800 dark:text-white">Subtotal</p>
                  <p className="text-base leading-none text-gray-800 dark:text-white">$ {precioTotal}</p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800 dark:text-white">Shipping</p>
                  <p className="text-base leading-none text-gray-800 dark:text-white"></p>
                </div>
                <div className="flex items-center justify-between pt-5">
                  <p className="text-base leading-none text-gray-800 dark:text-white">Tax</p>
                  <p className="text-base leading-none text-gray-800 dark:text-white"></p>
                </div>
              </div>
              <div>
                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                  <p className="text-2xl leading-normal text-gray-800 dark:text-white">Total</p>
                  <p className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">$ {precioTotal}</p>
                </div>
                <button onClick={() => { pagosCarrito(productId) }} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">
                  Comprar
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;

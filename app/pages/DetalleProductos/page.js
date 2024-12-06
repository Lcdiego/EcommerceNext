'use client'
import { useContext, useEffect } from 'react';
import { ProductoContext } from '../../components/contex/contex';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import Image from 'next/image';
const DetalleProducts = () => {
  const { productoSeleccionado, agregarCarrito, pagos } = useContext(ProductoContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!productoSeleccionado) {
    return <div>Cargando...</div>;
  }

  // Crear la imagen principal
  const mainImage = {
    original: productoSeleccionado.imagePath,  // La imagen principal
    thumbnail: productoSeleccionado.imagePath,  // La misma imagen para miniatura (puedes usar una versión más pequeña si la tienes)
    
  };

  // Crear las imágenes de la galería en miniatura
  const galleryImages = productoSeleccionado.gallery?.map(imagePath => ({
    original: imagePath,   // URL de la imagen en tamaño original
    thumbnail: imagePath,  // URL para la miniatura
    // Descripción opcional
  })) || [];

  // Agregar la imagen principal como primer elemento de la galería
  const images = [mainImage, ...galleryImages];

  return (
    <div className='bg-gray-100 flex flex-col'>
      <div className='sm:flex sm:justify-center mt-72 sm:mt-60'>
        <div className='sm:w-1/2 flex justify-center items-center'>
          {/* Pasar las imágenes a ImageGallery */}
          <ImageGallery 
            items={images}  // Pasar el array de imágenes
            autoPlay={false}
            showPlayButton={false}
            showThumbnails={true}
            showFullscreenButton={false}
            showNav={false}
          />
        </div>
        
        <div className='h-96 sm:h-auto bg-white mt-10 sm:mt-0 sm:mt-30 sm:w-80 lg:w-96 sm:rounded-md border-2 border-gray-200'>
          <div className='h-full w-full flex flex-col justify-around'>
            <div className='ml-5 h-40 flex flex-col justify-around font-sans text-md font-semibold'>
              <h1>{productoSeleccionado.name}</h1>
              <p>$: {productoSeleccionado.price}</p>
              <p>Stock: {productoSeleccionado.stock}</p>
            </div>
            <div className='ml-5 font-sans text-md font-bold'>
              Paga con mercado pago
              <div>
                <Image width={40} height={40} src={'/mercadoPago.png'} alt="" />
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <button
                className="block w-80 mb-5 sm:w-60 lg:w-80 select-none rounded-lg bg-blue-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => { agregarCarrito(productoSeleccionado._id) }}
              >
                Agregar al carrito
              </button>
              <button
                className="block w-80 sm:w-60 lg:w-80 select-none rounded-lg bg-blue-500/70 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => { pagos(productoSeleccionado._id) }}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-1/2 p-10 bg-white sm:ml-5 md:ml-10 xl:ml-40 mt-10 mb-10'>
        <p className='mb-3 font-sans text-md font-semibold'>Descripción:</p>
        <p>{productoSeleccionado.description}</p>
      </div>
    </div>
  );
};

export default DetalleProducts;

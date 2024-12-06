'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductoContext } from 'app/components/contex/contex';
import Image from 'next/image';
import Sidebar from '../../components/Sidebar/Sidebar';

const ProductosList = () => {
  const { productos, loading, eliminarProductoAdmin } = useContext(ProductoContext);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/pages/UpdateProductos/${id}/edit`); // Redirige a la página de edición del producto
  };

  return (
    <div className="bg-gray-300 sm:flex">
      <Sidebar />

      <div className="sm:flex-1 ml-10"> 
        <h1 className="sm:pt-48 sm:pb-10 block font-sans text-base font-medium leading-relaxed text-black antialiased">Lista de Productos</h1>
        {loading && <div className="text-black">loading...</div>}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mt-4">
            <p>{error}</p>
          </div>
        )}

        <div className="2xl:mx-40">
          <div className="flex justify-center flex-wrap">
            {productos.map((producto) => (
              <div key={producto._id} className="m-5 relative flex w-72  flex-col justify-between rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="flex justify-center">
                  <div className="relative mx-4 mt-4 w-full h-[27vh] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <div className='w-full h-full'>
                      <Image
                        width={500}
                        height={500}
                        alt={producto.name || 'Producto sin nombre'}
                        src={producto.imagePath}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-2 ">
                  <div className="h-full mb-5">
                    <div className='my-4'>
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                       Titulo: {producto.name}
                      </p>
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        Precio: $-{producto.price}
                      </p>
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        Stock: $-{producto.stock}
                      </p>
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        Seccion: $-{producto.sectionHome}
                      </p>
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        Descripcion: $-{producto.description}
                      </p>
                    </div>
                    <button
                      className="block w-full mb-2 select-none rounded-lg bg-red-300 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => eliminarProductoAdmin(producto._id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="block w-full select-none rounded-lg bg-blue-500/70 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handleEdit(producto._id)}
                    >
                      Editar
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
};

export default ProductosList;

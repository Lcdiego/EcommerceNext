'use client'

import { useContext, useState } from 'react';
import { ProductoContext } from '../../components/contex/contex';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CiSearch } from 'react-icons/ci';
import Sidebar from '../../components/Sidebar/Sidebar';
const SearchInputAdmin = () => {
  const { BuscarProduct, SearchResult, eliminarProductoAdmin } = useContext(ProductoContext);
  const [Query, setQuery] = useState('');

  const searchProduct = async (e) => {
    e.preventDefault();
    if (Query.trim()) {
      await BuscarProduct(Query);
      setTimeout(() => {
        setQuery('');
      }, 5000);
    }
  };

  const router = useRouter();
  const handleEdit = (id) => {
    router.push(`/pages/UpdateProductos/${id}/edit`); // Redirige a la página de edición del producto
  };

  return (
    <div className="block sm:flex">
      {/* Sidebar Fijo */}
      <div className="  sm:w-64 bg-gray-800 text-white">
        <Sidebar /> 
      </div>

      <div className="sm:pt-52 sm:flex-1 sm:ml-">
        <div className=" ml-5 sm:ml-4 mb-5">
          <h1 className=" mt-5 sm:mt-0 font-bold text-md sm:text-2xl">
            Buscar productos
          </h1>
        </div>

        <form onSubmit={searchProduct} action="" className="ml-5 sm:ml-4 w-72 sm:w-80">
          <div className="relative flex items-center border border-gray-300 rounded-l">
            <input
              type="text"
              value={Query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-0.5 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-l"
              placeholder="Buscar"
            />
            <CiSearch className="absolute left-3 text-gray-400" />
          </div>
        </form>

        <div className="flex justify-center flex-wrap mx-40">
          {SearchResult.length === 0 && <p className="text-black my-20 sm:my-52 text-2xl">No se encontraron productos.</p>}
          <div className="sm:w-full flex sm:justify-between flex-wrap mt-10">
            {SearchResult.map((producto) => (
              <div key={producto._id} className="my-10 relative flex w-72 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="flex justify-center">
                  <div className="relative mx-4 mt-4 w-full h-[27vh] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <Link href={'/detalle-products'} onClick={() => { /* SeleccionarProducts(producto) */ }}>
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={`${producto.imagePath}`}
                        className="h-full w-full object-contain"
                      />
                    </Link>
                  </div>
                </div>

                <div className="p-6 h-48">
                  <div className="h-full mb-5 flex flex-col justify-between">
                    <div>
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        {producto.name}
                      </p>
                      <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        Precio: $-{producto.price}
                      </p>
                    </div>
                    <button
                      className="block w-full select-none rounded-lg bg-red-300 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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

export default SearchInputAdmin;

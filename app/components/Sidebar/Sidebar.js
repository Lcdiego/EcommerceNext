import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="pt-64 sm:pt-42  sm:w-64 block sm:flex bg-gray-800 text-white ">
      <ul className="sm:fixed ml-5 pb-3 sm:space-y-4 ">
        <li><h1  className="text-sky-600">Dashboard</h1></li>
        <li><Link href="/pages/AddProductosAdmin" className="hover:text-gray-400">Agregar Producto</Link></li>
        <li><Link href="/pages/TodosProductosAdmin" className="hover:text-gray-400">Todos los Productos</Link></li>
        <li><Link href="/pages/Search-input-Admin" className="hover:text-gray-400">Buscar Productos</Link></li>
        <li><Link href="/pages/UpdateProductos" className="hover:text-gray-400">Actualizar Productos</Link></li>
        {/* Agrega más enlaces según sea necesario */}
      </ul>
    </div>
  );
};

export default Sidebar;
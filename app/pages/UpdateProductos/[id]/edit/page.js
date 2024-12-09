"use client";

import { useContext, useState, useEffect, use } from "react";
import { ProductoContext } from "../../../../components/contex/contex";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation"; 

const EditarProducto = ({ params}) => {
  const { id } = use(params);
  console.log(id);
  
  const { token, mensaje, MensajeBack } = useContext(ProductoContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    sectionHome: "",
    stock: "",
    category: "",
    image: null,
    gallery: [],
  });
console.log(formData);


  const [error, setError] = useState(null);
  const router = useRouter(); 

  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/update/${id}/edit`);
        setFormData(response.data.product);
        console.log(response.data);
        
      } catch (err) {
        console.error("Error al cargar el producto:", err);
      }
    };
    fetchProductData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : Array.from(files),
    });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageBase64 = formData.image ? await toBase64(formData.image) : null;
      const galleryBase64 = formData.gallery.length
        ? await Promise.all(formData.gallery.map(toBase64))
        : [];

      const response = await axios.put(
        `/api/update/${id}/edit`, 
        {
          id: id,
          ...formData,
          image: imageBase64, 
          gallery: galleryBase64,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      MensajeBack(response.data.message);

     

      // Limpiar el formulario
      setFormData({
        name: "",
        price: "",
        description: "",
        sectionHome: "",
        stock: "",
        category: "",
        image: null,
        gallery: [],
      });
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      setError(err.response?.data?.message || "Ocurrió un error.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
    <Sidebar />
    <div className="w-full flex justify-center">
      <div className="flex flex-col">
        <div className="flex sm:justify-center sm:mb-4 mt-5 sm:mt-44">
          <h2 className="mb-5 sm:mt-0 font-bold text-md sm:text-lg">Editar productos</h2>
        </div>
        <div className="z-50 fixed w-[81%] flex justify-center items-end">
          {mensaje && <p className="text-green-500 bg-gray-200 rounded-md p-5 text-2xl font-bold">{mensaje}</p>}
          {error && <p className="text-red-400 bg-gray-200 p-5 rounded-md text-2xl font-bold">{error}</p>}
        </div>
        <form className="flex flex-col mb-10" onSubmit={handleSubmit}>
          <select
            className="text-sm sm:text-sm py-2 px-1 mb-3 bg-gray-200 rounded-md border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            name="sectionHome"
            value={formData.sectionHome}
            onChange={handleChange}
          >
            <option value="">Agregar sección de la página principal (Home)</option>
            <option value="Encabezado">Encabezado</option>
            <option value="Producto Exclusivo">Producto Exclusivo</option>
            <option value="Oferta del día">Oferta del día</option>
            <option value="Productos futuros">Productos futuros</option>
          </select>

          <select
            className="text-sm sm:text-sm py-2 px-1 mb-3 bg-gray-200 rounded-md border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Agregar Categoría</option>
            <option value="Celulares y teléfonos">Celulares y teléfonos</option>
            <option value="Computación">Computación</option>
            <option value="Cámaras y accesorios">Cámaras y accesorios</option>
            <option value='art de pezca'> Art de pezca</option>
          </select>

          <input
            className="text-sm sm:text-sm block w-full p-2  text-black rounded-md bg-gray-200 mb-3"
            type="text"
            name="name"
            placeholder="Título"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="text-sm sm:text-sm block w-full p-2  text-black rounded-md bg-gray-200 mb-3"
            type="number"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            className="text-sm sm:text-sm block w-full p-2  text-black rounded-md bg-gray-200 mb-3"
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />
          <textarea
            className="text-sm sm:text-sm block w-full p-4  text-black rounded-md bg-gray-200 mb-7"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="text-sm sm:text-sm mb-5">
            <h2>Subir Avatar</h2>
            <input type="file" onChange={handleFileChange} name="image" />
          </div>

          <div className="text-sm sm:text-sm">
            <h2>Subir Galería de Fotos</h2>
            <input type="file" multiple onChange={handleFileChange} name="gallery" />
          </div>
          <button type="submit" className="text-sm sm:text-sm p-3 rounded-md mt-5 bg-blue-500 font-bold">
            Editar
          </button>
        </form>
      </div>
    </div>
  </div>  );
};

export default EditarProducto;
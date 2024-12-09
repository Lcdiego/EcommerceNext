'use client'
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { showCartAlert } from "../../components/showCartAlert/showCartAlert";
import { useRouter } from "next/navigation";
const ProductoContext = createContext();

const ProductoProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null);
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [count, setCount] = useState(0);
    const [SearchResult, setSearchResult] = useState([]);
    const [initPoint, setInitPoint] = useState('');
    const [dark, setDark] = useState(false)

    const [alertVisible, setAlertVisible] = useState(false);

    const router = useRouter();



    const pagos = async (data) => {
        console.log(data);

        try {
            const config = {
                headers: {

                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const response = await axios.post('', {
                data, _id: usuario._id
            }, config);
            setInitPoint(response.data.init_point);
            window.location.href = response.data.init_point;
        } catch (error) {
            console.error('Error al crear la preferencia:', error);
        }
    };
    const pagosCarrito = async (data) => {
        console.log(data);



        try {
            const config = {
                headers: {

                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const response = await axios.post('', {
                data
            }, config);
            setInitPoint(response.data.init_point);
            window.location.href = response.data.init_point;
        } catch (error) {
            console.error('Error al crear la preferencia:', error);
        }
    };

    const handledark = () => {

        setDark(!dark)
    }

    const BuscarProduct = async (query) => {
        try {
            const response = await axios.get(`/api/productos/search?query=${query}`);
            setSearchResult(response.data || []);
        } catch (error) {
            console.error('Error al cargar productos', error);
            setSearchResult([]);
        }
    }
    const agregarProductos = async (data) => {
        console.log('toke enviado', token);


        try {

            const config = {
                headers: {

                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const response = await axios.post(
                "/api/productos/add",
                data,
                config,
                { id: usuario.id },
            );

            MensajeBack(response.data.message);


        } catch (err) {
            console.error("Error al subir el producto:", err);
            setError(err.response.data.message || "Ocurrió un error.");
        }
    }
    useEffect(() => {
        const fetchProductos = async () => {


            try {
                const { data } = await axios.get('/api/productos/productos');
                setProductos(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products', error);
                setLoading(false);
            }
        }
        fetchProductos()

    }, []);


    useEffect(() => {
        const obtenerCarrito = async () => {
            if (!usuario) {
                console.error('Usuario no definido o sin _id');
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get('/api/carrito', {
                    params: { userId: usuario.id },
                });

                setCarrito(response.data);
                console.log(response.data);

            } catch (error) {
                console.error('Error al obtener el carrito:', error);
                setError('No se pudo cargar el carrito');
            } finally {
                setLoading(false);
            }
        };
        if (usuario) {
            obtenerCarrito();
        }
    }, [usuario]);



    const MensajeBack = (dataMensaje) => {

        setMensaje(dataMensaje)
        setTimeout(() => {
            setMensaje('')
        }, 3000);
    }





    const SeleccionarProducts = (productsData) => {
        setProductoSeleccionado(productsData)

    }


    const agregarCarrito = async (productId) => {


        try {
            if (!usuario || !usuario.id) {
                router.push('/pages/Login');
                return;
            }


            const config = {
                headers: {

                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const response = await axios.post('/api/carrito', {
                userId: usuario.id,
                productId,
            }, config);



            const productDuplicate = carrito.find((item) => item.productId === response.data.carritoItem.productId);

            if (productDuplicate) {

                const updatedCarrito = carrito.map((item) =>
                    item.productId === response.data.carritoItem.productId
                        ? response.data.carritoItem
                        : item
                );

                setCarrito(updatedCarrito);
            } else {

                setCarrito([...carrito, response.data.carritoItem]);
            }
            setAlertVisible(true);
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    useEffect(() => {
        if (alertVisible) {
            showCartAlert();
            setAlertVisible(false);
        }

    }, [alertVisible]);

    const actualizarCantidad = async (productId, cantidad) => {
        try {
            const config = {
                headers: {

                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const response = await axios.put('/api/carrito', {
                userId: usuario.id,
                productId,
                cantidad,
            }, config);

            const updatedCarrito = carrito.map((item) =>
                item.productId === productId
                    ? { ...item, cantidad: response.data.cantidad, price: response.data.price }
                    : item
            );
            setCarrito(updatedCarrito);
        } catch (error) {
            console.error('Error updating quantity', error);
        }
    };




    const eliminarProducto = async (productId) => {

        try {
            const config = {
                headers: {

                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const response = await axios.delete('/api/carrito', {

                data: {
                    userId: usuario.id,
                    productId,
                },
            }, config);

            if (Array.isArray(response.data)) {
                setCarrito(response.data);
            } else {
                console.error('La respuesta no es un array', response.data);
                setCarrito([]);
            }

            console.log('Producto eliminado del carrito', response.data);

        } catch (error) {
            console.log('error al eliminar producto', error);
        }
    };




    const eliminarProductoAdmin = async (id) => {
        try {
            const config = {
                headers: {

                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };
            const response = await axios.delete(`/api/productos/delete?id=${id}`,
                config
            );

            if (Array.isArray(response.data)) {
                setProductos(response.data);
            } else {
                console.error('La respuesta no es un array', response.data);
                setProductos([]); // O maneja la respuesta de otra manera según tu lógica
            }

            setMensaje('Producto eliminado por admin', response.data);
        } catch (error) {
            console.log('error al eliminar producto', error);
            setError('Error al eliminar', error)
        }
        setTimeout(() => {
            setMensaje('')
            setError('')
        }, 3000);
    };
    const registrarse = async (formData) => {
        try {
            const response = await axios.post('/api/auth/register', formData);
            console.log(response.data);
            setMensaje(response.data.message)


        } catch (error) {
            setError(error.response.data.message);
        }
        setTimeout(() => {
            setMensaje('')
            setError('')
        }, 2000);


    }

    const login = async (userData) => {
        try {
            const response = await axios.post('/api/auth/login', userData)
            setUsuario(response.data.user);
            setToken(response.data.token);
            setRole(response.data.user.role)

        } catch (error) {

            setError(error.response.data.message)
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    }

    const logout = () => {
        setUsuario(null);
        setToken('');
        setRole('');
        setCarrito([]);


    };


    useEffect(() => {
        if (Array.isArray(carrito)) {
            setCount(carrito.length);
        } else {
            console.error('El carrito no es un array', carrito);
        }
    }, [carrito]);

    if (!Array.isArray(carrito)) {
        return <div>El carrito está vacío o no es un array</div>;
    }
    return (
        <ProductoContext.Provider
            value={{ initPoint, pagos, pagosCarrito, BuscarProduct, SearchResult, count, role, productos, productoSeleccionado, SeleccionarProducts, loading, token, carrito, usuario, error, MensajeBack, mensaje, registrarse, login, logout, agregarCarrito, actualizarCantidad, eliminarProducto, eliminarProductoAdmin, agregarProductos, handledark, dark }}>
            {children}
        </ProductoContext.Provider>
    );

}

export { ProductoProvider, ProductoContext }
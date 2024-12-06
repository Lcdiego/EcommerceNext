

import Swal from "sweetalert2";




export const showCartAlert = () => {
  Swal.fire({
    title: "¡Producto agregado al carrito!",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
};



export const showCartAlertEliminar = (eliminarProducto, productId) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Este producto será eliminado del carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Llamar a la función para eliminar el producto
      eliminarProducto(productId);
      Swal.fire({
        title: "Eliminado",
        text: "El producto ha sido eliminado del carrito.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "center",
      });
    }
  });
};

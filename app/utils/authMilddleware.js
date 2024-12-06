import jwt from 'jsonwebtoken';
import User from '../../models/Usuario'; // Asegúrate de importar correctamente



export const authMiddleware = async (req) => {
  const token = req.headers.get('x-auth-token');

  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decodificado en req.user
    return null; // Permitir que pase
  } catch (err) {
    return new Response('Forbidden', { status: 403 });
  }
};

export const adminMiddleware = async (req) => {
 
  
  try {
    const user = await User.findById(req.user.user.id); // `req.user` está disponible por la validación del token

    if (!user) {
      return new Response('Usuario no encontrado', { status: 404 });
    }

    if (user.role !== 'admin') {
      return new Response('Acceso denegado', { status: 403 });
    }

    return null; // Permitir el flujo si el usuario es admin
  } catch (err) {
    console.error("Error al verificar el rol del usuario:", err);
    return new Response('Error en el servidor', { status: 500 });
  }
};
import connectDB from '../../../../lib/db'; // Asegúrate de tener esta conexión a MongoDB configurada
import User from '../../../../models/Usuario'; // Modelo del usuario
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    await connectDB();

    try {
        const { email, password } = await req.json(); // Parsear datos del request

        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ message: 'Error al ingresar Email' }), {
                status: 400,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Error al ingresar Contraseña' }), {
                status: 400,
            });
        }

        const payload = { user: { id: user.id } };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

        return new Response(
            JSON.stringify({ 
                token, 
                user: { id: user.id, name: user.name, email: user.email, role: user.role }, 
                message: 'Inicio de sesión exitoso' 
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error logging in user:', error);
        return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500 });
    }
}

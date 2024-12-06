import connectDB from '../../../../lib/db';
import User from '../../../../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    await connectDB();

    try {
        const { name, email, password, role } = await req.json();

        let user = await User.findOne({ email });
        if (user) {
            return new Response(JSON.stringify({ message: 'El usuario ya existe' }), {
                status: 400,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

        return new Response(JSON.stringify({ 
            token, 
            message: 'Usuario registrado satisfactoriamente' 
        }), {
            status: 201,
        });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        return new Response(JSON.stringify({ message: 'Server Error' }), {
            status: 500,
        });
    }
}

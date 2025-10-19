import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
        }
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }
        // Hash password
        const hashedPassword = await hash(password, 12);
        // Create user with default role
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: {
                    connect: { name: 'USER' } // Connect to default role
                }
            },
            include: { role: true }
        });
        // Generate JWT
        const token = sign({
            sub: user.id,
            name: user.name,
            email: user.email,
            role: user.role.name
        }, process.env.JWT_SECRET, { expiresIn: '30d' });
        return NextResponse.json({ token });
    }
    catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

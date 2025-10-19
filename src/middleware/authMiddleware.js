import { NextResponse } from 'next/server';
import { verify, sign } from 'jsonwebtoken';
const prisma = new PrismaClient();
export class AuthMiddleware {
    // Validate JWT token
    static async validateToken(token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret');
            // Additional database check
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId }
            });
            if (!user)
                return null;
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
    // Check user role authorization
    static checkAuthorization(userRole, requiredRoles) {
        return requiredRoles.includes(userRole);
    }
    // Middleware for protecting routes
    static async protectRoute(req, requiredRoles = ['ADMIN', 'AGENT']) {
        // Extract token from cookies or Authorization header
        const token = req.cookies.get('auth_token')?.value ||
            req.headers.get('authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
        }
        // Validate token
        const decoded = await this.validateToken(token);
        if (!decoded) {
            return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
        }
        // Check role authorization
        if (!this.checkAuthorization(decoded.role, requiredRoles)) {
            return NextResponse.json({ message: 'Forbidden: Insufficient permissions' }, { status: 403 });
        }
        // Attach user info to request for further processing
        req.user = decoded;
        return null;
    }
    // Generate authentication token
    static generateToken(user) {
        return sign({
            userId: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
    }
}

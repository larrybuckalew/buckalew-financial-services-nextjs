import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
const prisma = new PrismaClient();
// Default authentication configuration
const defaultAuthConfig = {
    protectedRoutes: ['/dashboard', '/profile', '/admin'],
    adminRoutes: ['/admin'],
    publicRoutes: ['/login', '/register', '/']
};
export class AuthMiddleware {
    constructor(config) {
        this.config = {
            ...defaultAuthConfig,
            ...config
        };
    }
    // Verify JWT token
    async verifyToken(token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET || '');
            // Additional validation
            if (typeof decoded === 'object' && decoded.userId) {
                const user = await prisma.user.findUnique({
                    where: { id: decoded.userId },
                    select: {
                        id: true,
                        isActive: true,
                        role: { select: { name: true } }
                    }
                });
                return user && user.isActive ? user : null;
            }
            return null;
        }
        catch (error) {
            return null;
        }
    }
    // Middleware handler
    async handle(req) {
        const path = req.nextUrl.pathname;
        const token = req.cookies.get('auth_token')?.value;
        // Public routes bypass authentication
        if (this.config.publicRoutes.includes(path)) {
            return NextResponse.next();
        }
        // Check if route requires authentication
        const isProtectedRoute = this.config.protectedRoutes.some(route => path.startsWith(route));
        const isAdminRoute = this.config.adminRoutes.some(route => path.startsWith(route));
        // No token for protected route
        if (isProtectedRoute && !token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        // Verify token
        const user = token ? await this.verifyToken(token) : null;
        // Invalid token
        if (isProtectedRoute && !user) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        // Admin route access check
        if (isAdminRoute && user?.role?.name !== 'ADMIN') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        return NextResponse.next();
    }
    // Generate authentication middleware
    middleware() {
        return async (req) => {
            return this.handle(req);
        };
    }
}
// Create and export default auth middleware
export const authMiddleware = new AuthMiddleware();

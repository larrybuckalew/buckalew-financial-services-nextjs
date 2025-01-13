import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Protect all /dashboard routes
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return !!token;
      }
      // Protect /admin routes - require ADMIN role
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'ADMIN';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
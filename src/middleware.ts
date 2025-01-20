import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/api/` paths are protected by default
      if (req.nextUrl.pathname.startsWith("/api/")) {
        return !!token;
      }
      
      // Protect dashboard routes
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        return !!token;
      }
      
      // Allow other routes
      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
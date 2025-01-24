import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma/db"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  debug: true,
  secret: "4e8455f5bd07cba1a7a398bacc941c00",
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("Auth attempt for:", credentials?.email);
          
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email }
          });
          
          console.log("User found:", user?.email);
          
          if (!user?.password) {
            console.log("No password found");
            throw new Error("Invalid credentials");
          }

          const isValid = await compare(credentials?.password || "", user.password);
          console.log("Password valid:", isValid);

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ]
}

import { hash } from "bcrypt"
import prisma from "@/lib/prisma/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    
    const exists = await prisma.user.findUnique({
      where: { email },
    })

    if (exists) {
      return new NextResponse("User already exists", { status: 400 })
    }

    const hashedPassword = await hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    return new NextResponse("Error creating user", { status: 500 })
  }
}

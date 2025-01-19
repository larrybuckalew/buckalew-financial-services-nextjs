import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const data = await req.json();
  const { type, inputs, result } = data;

  const calculation = await prisma.calculationHistory.create({
    data: {
      type,
      inputs,
      result,
      userId: session.user.id,
    },
  });

  return NextResponse.json(calculation);
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const calculations = await prisma.calculationHistory.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(calculations);
}
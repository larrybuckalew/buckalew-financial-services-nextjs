import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Transactions endpoint placeholder' 
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: 'Transaction creation placeholder' 
  });
}
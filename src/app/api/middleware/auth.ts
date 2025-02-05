import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Placeholder basic authentication
  return NextResponse.next();
}
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Placeholder rate limiter
  return NextResponse.next();
}
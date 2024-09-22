import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Incoming request:', request.method, request.url);
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
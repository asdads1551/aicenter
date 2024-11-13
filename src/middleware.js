import { NextResponse } from 'next/server.js';

export function middleware(request) {
  console.log('Incoming request:', request.method, request.url);
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
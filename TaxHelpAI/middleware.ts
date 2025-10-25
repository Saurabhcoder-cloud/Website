import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 100;

const rateLimitStore = globalThis as unknown as {
  rateLimit?: Map<string, { count: number; expires: number }>;
};

function applySecurityHeaders(response: NextResponse) {
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

function rateLimit(ip: string) {
  if (!rateLimitStore.rateLimit) {
    rateLimitStore.rateLimit = new Map();
  }
  const now = Date.now();
  const entry = rateLimitStore.rateLimit.get(ip);
  if (!entry || entry.expires < now) {
    rateLimitStore.rateLimit.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count += 1;
  rateLimitStore.rateLimit.set(ip, entry);
  return true;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  applySecurityHeaders(response);

  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous';
    if (!rateLimit(ip)) {
      return new NextResponse('Too many requests', { status: 429 });
    }
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/dashboard', '/refund-calculator']
};

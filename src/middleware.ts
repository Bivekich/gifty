import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('Middleware processing path:', path);

  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/verify-email',
    '/forgot-password',
    '/reset-password',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/verify-email',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/api/auth/logout',
  ];

  const protectedPaths = ['/dashboard', '/admin'];

  const isPublicPath = publicPaths.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );

  const isProtectedPath = protectedPaths.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );

  // Получаем и проверяем токен
  const token = request.cookies.get('auth-token')?.value;
  console.log('Token from cookies:', token ? 'exists' : 'not found');

  let isValidToken = false;
  if (token) {
    const payload = await verifyToken(token);
    isValidToken = Boolean(payload);
    console.log('Token validation result:', isValidToken ? 'valid' : 'invalid');
  }

  // Если пользователь авторизован и пытается зайти на страницу логина/регистрации,
  // редиректим в дашборд
  if (isValidToken && (path === '/login' || path === '/register')) {
    console.log('Redirecting authenticated user from auth pages to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Если это публичный путь, пропускаем
  if (isPublicPath) {
    console.log('Allowing access to public path');
    return NextResponse.next();
  }

  // Если это защищенный путь и нет валидного токена, редиректим на логин
  if (isProtectedPath && !isValidToken) {
    console.log('Redirecting unauthenticated user to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Для API запросов возвращаем 401 при отсутствии токена
  if (path.startsWith('/api/') && !isValidToken) {
    console.log('Returning 401 for unauthorized API request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('Allowing request to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};

// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Esta função pode ser parte do seu Middleware ou um helper para verificar se o usuário está autenticado
function isAuthenticated(request: NextRequest) {
  // Substitua com a lógica para verificar o token JWT no cookie ou cabeçalho de autorização
  const token = request.cookies.get('token');
  // Verifique o token com sua API ou uma biblioteca JWT
  return Boolean(token);
}

export function middleware(request: NextRequest) {
  // Verificar se o usuário está autenticado
  if (!isAuthenticated(request)) {
    // Se não estiver autenticado e estiver tentando acessar uma página protegida, redirecione para /login
    if (request.nextUrl.pathname.startsWith('/protegido')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Se o usuário estiver autenticado ou estiver acessando uma rota não protegida, continue normalmente
  return NextResponse.next();
}

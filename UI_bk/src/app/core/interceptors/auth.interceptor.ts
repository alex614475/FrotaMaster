// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Adicionar headers de autenticação se necessário
  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });

  return next(authReq);
};

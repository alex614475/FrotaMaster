// src/app/core/interceptors/api.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[API] ${req.method} ${req.url}`);

  return next(req).pipe(
    tap({
      next: (event) => {
        console.log(`[API] Response:`, event);
      },
      error: (error) => {
        console.error(`[API] Error:`, error);
      },
    })
  );
};

// src/app/core/interceptors/network-error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const networkErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      // Tratamento de erro global para todas as requisições HTTP
      notificationService.showDatabaseError(error);
      return throwError(() => error);
    })
  );
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, tap, switchMap } from 'rxjs';
import { LoginService } from '../../features/login/service/login.service';
import { AuthApiService } from '../services/auth.api.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authapiService = inject(AuthApiService);
  const loginService = inject(LoginService);

  const getReqWithUpdateToken = (request: any) => {
    const token = authapiService.getToken();
    if (!token) return request;

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const cloneReq = getReqWithUpdateToken(req);

  return next(cloneReq).pipe(
    catchError((error) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      return loginService.refreshToken().pipe(
        tap((refTokenResponse) => {
          authapiService.setAuthTokens(refTokenResponse.token, refTokenResponse.refreshToken);
        }),

        switchMap(() => next(getReqWithUpdateToken(req)))
      );
    })
  );
};

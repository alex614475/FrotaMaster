import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../core/services/storage.service';
import { STORAGE_REFRESH_TOKEN } from '../../../core/services/storage.service.constants';
import { LoginRefreshTokenRequest, LoginRequest, LoginResponse } from '../../../models/Login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private controllerUrl = `${environment.apiUrl}/login`;
  private httpClient = inject(HttpClient);
  private storageService = inject(StorageService);

  login(heroiRequest: LoginRequest) {
    return this.httpClient.post<LoginResponse>(`${this.controllerUrl}/login`, heroiRequest);
  }

  checkHeroi() {
    return this.httpClient.get<string>(`${this.controllerUrl}/somente-heroi`);
  }

  refreshToken() {
    const tokenValidation = this.storageService.getItem<string>(STORAGE_REFRESH_TOKEN);
    if (!tokenValidation) throw new Error('User não autenticado');

    const refreshTokenRequest: LoginRefreshTokenRequest = {
      refreshToken: tokenValidation,
    };

    return this.httpClient.post<LoginResponse>(
      `${this.controllerUrl}/refresh-token`,
      refreshTokenRequest
    );
  }
}

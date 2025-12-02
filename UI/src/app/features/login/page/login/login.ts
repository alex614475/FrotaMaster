import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { catchError, throwError } from 'rxjs';
import { Alert } from '../../../../shared/components/generic-alert/alert';
import { StorageService } from '../../../../core/services/storage.service';
import {
  STORAGE_TOKEN,
  STORAGE_REFRESH_TOKEN,
  STORAGE_USER,
} from '../../../../core/services/storage.service.constants';
import { LoginRequest } from '../../../../models/Login.model';
import { AlertService } from '../../../../shared/components/generic-alert/Alert.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Alert], // adicionado NgIf
  templateUrl: './login.html',
})
export class Login {
  email = '';
  senha = '';
  loading = false;

  constructor(
    private location: Location,
    private loginService: LoginService,
    private storageService: StorageService,
    private alertService: AlertService,
    private title: Title
  ) {
    this.title.setTitle('Login');
  }

  voltar() {
    this.location.back();
  }

  entrar() {
    this.loading = true;
    const request: LoginRequest = { email: this.email, senha: this.senha };

    this.loginService
      .login(request)
      .pipe(
        catchError((err) => {
          this.loading = false;
          // Mostra alerta mesmo que venha 401 do servidor
          this.alertService.show(err.error?.message || 'Usuário ou senha incorretos!', 'error');
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          this.storageService.setItem(STORAGE_TOKEN, res.token);
          this.storageService.setItem(STORAGE_REFRESH_TOKEN, res.refreshToken);
          this.storageService.setItem(STORAGE_USER, res.usuario);

          this.loading = false;
          this.alertService.show('Login realizado com sucesso!', 'success');
          window.location.href = '/dashboard';
        },
      });
  }
}

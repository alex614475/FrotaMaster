import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { StorageService } from '../../../core/services/storage.service';
import {
  STORAGE_REFRESH_TOKEN,
  STORAGE_TOKEN,
  STORAGE_USER,
} from '../../../core/services/storage.service.constants';
import { LoginRequest } from '../../../models/Login.model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  senha = '';

  loading = false;
  erro: string | null = null;

  constructor(
    private location: Location,
    private loginService: LoginService,
    private storageService: StorageService
  ) {}

  voltar() {
    this.location.back();
  }

  entrar() {
    this.erro = null;
    this.loading = true;

    const request: LoginRequest = {
      email: this.email,
      senha: this.senha,
    };

    this.loginService.login(request).subscribe({
      next: (res) => {
        // SALVAR TOKEN PRINCIPAL
        this.storageService.setItem(STORAGE_TOKEN, res.token);

        // SALVAR REFRESH TOKEN
        this.storageService.setItem(STORAGE_REFRESH_TOKEN, res.refreshToken);

        // SALVAR USUÁRIO (opcional, mas geralmente importante)
        this.storageService.setItem(STORAGE_USER, res.usuario);

        this.loading = false;

        // Redirecionar para o dashboard
        window.location.href = '/dashboard';
      },

      error: (err) => {
        this.loading = false;
        this.erro = err.error?.message || 'Falha ao realizar login';
      },
    });
  }
}

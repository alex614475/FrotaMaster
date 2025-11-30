import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  imports: [CommonModule, FormsModule, NgIf, RouterModule],
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
    private storageService: StorageService,
    private title: Title
  ) {
    // 🔥 Ajusta o título da aba quando abrir essa tela
    this.title.setTitle('Login');
  }

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
        this.storageService.setItem(STORAGE_TOKEN, res.token);
        this.storageService.setItem(STORAGE_REFRESH_TOKEN, res.refreshToken);
        this.storageService.setItem(STORAGE_USER, res.usuario);

        this.loading = false;

        // Redireciona após login
        window.location.href = '/dashboard';
      },

      error: (err) => {
        this.loading = false;
        this.erro = err.error?.message || 'Falha ao realizar login';
      },
    });
  }
}

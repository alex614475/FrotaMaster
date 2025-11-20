// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string = 'Sucesso'): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string = 'Erro'): void {
    this.toastr.error(message, title, {
      timeOut: 8000,
      enableHtml: true,
    });
  }

  showWarning(message: string, title: string = 'Atenção'): void {
    this.toastr.warning(message, title);
  }

  showInfo(message: string, title: string = 'Informação'): void {
    this.toastr.info(message, title);
  }

  showDatabaseError(error: any): void {
    let errorMessage = 'Erro ao conectar com o banco de dados.';

    if (error.status === 0) {
      errorMessage = 'Servidor indisponível. Verifique sua conexão e tente novamente.';
    } else if (error.status === 404) {
      errorMessage = 'Recurso não encontrado no servidor.';
    } else if (error.status === 500) {
      errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
    } else if (error.message) {
      errorMessage = `Erro: ${error.message}`;
    }

    this.showError(
      `
      <div style="max-width: 300px;">
        <strong>${errorMessage}</strong>
        <br><br>
        <small>Status: ${error.status || 'Desconhecido'}</small>
        ${error.url ? `<br><small>URL: ${error.url}</small>` : ''}
      </div>
    `,
      'Erro de Conexão'
    );
  }
}

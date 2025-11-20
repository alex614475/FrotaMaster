// src/app/features/distribuicao-da-frota/pages/distribuicao-da-frota-list/distribuicao-da-frota-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Router } from '@angular/router';
import { RotaService } from '../../services/rota.service';
import { Observable } from 'rxjs';
import { Rota } from '../../../../models/rota.model';

@Component({
  selector: 'app-distribuicao-da-frota-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './distribuicao-da-frota-list.html',
})
export class DistribuicaoDaFrotaListComponent {
  rotas$!: Observable<Rota[]>;

  constructor(private rotaService: RotaService, private router: Router) {
    this.rotas$ = this.rotaService.listarRotas();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Agendada':
        return 'bg-blue-100 text-blue-800';
      case 'EmTransito':
        return 'bg-yellow-100 text-yellow-800';
      case 'Concluida':
        return 'bg-green-100 text-green-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  navegarParaDetalhes(id: number) {
    this.router.navigate(['/distribuicao-da-frota', id]);
  }
}

// src/app/features/distribuicao-da-frota/pages/distribuicao-da-frota-details/distribuicao-da-frota-details.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Rota } from '../../../../models/rota.model';
import { RotaService } from '../../services/rota.service';

@Component({
  selector: 'app-distribuicao-da-frota-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './distribuicao-da-frota-details.html',
})
export class DistribuicaoDaFrotaDetailsComponent {
  rota$!: Observable<Rota>;

  constructor(private rotaService: RotaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.rota$ = this.route.params.pipe(
      switchMap((params) => this.rotaService.buscarRotaPorId(+params['id']))
    );
  }

  getStatusClass(status: string) {
    switch (status?.toLowerCase()) {
      case 'ativo':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'inativo':
        return 'bg-gray-100 text-gray-800 border border-gray-300';
      case 'manutencao':
      case 'manutenção':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'em rota':
      case 'andamento':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'finalizado':
        return 'bg-purple-100 text-purple-800 border border-purple-300';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  }
}

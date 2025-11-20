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
  templateUrl: './distribuicao-da-frota-details.component.html',
})
export class DistribuicaoDaFrotaDetailsComponent {
  rota$!: Observable<Rota>;

  constructor(private rotaService: RotaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.rota$ = this.route.params.pipe(
      switchMap((params) => this.rotaService.buscarRotaPorId(+params['id']))
    );
  }
}

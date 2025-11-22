import { Component } from '@angular/core';
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

  navegarParaDetalhes(id: number) {
    this.router.navigate(['/distribuicao-da-frota/details', id]);
  }
}

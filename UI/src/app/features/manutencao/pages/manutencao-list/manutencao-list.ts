import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ManutencaoService } from '../../services/manutencao.service';
import { Manutencao } from '../../../../models/manutencao.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manutencao-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manutencao-list.html',
})
export class ManutencaoListComponent implements OnInit {
  manutencoes$!: Observable<Manutencao[]>;
  loading = true;

  constructor(private manutencaoService: ManutencaoService, private router: Router) {}

  ngOnInit(): void {
    this.manutencoes$ = this.manutencaoService.listarManutencoes();

    this.manutencoes$.subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });
  }

  onCadastrar() {
    this.router.navigate(['/manutencao/cadastro']);
  }

  onEditar(id: number) {
    this.router.navigate(['/manutencao/editar', id]);
  }
}

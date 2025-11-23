// lista-veiculos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Veiculo } from '../../../../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';
import {
  GenericTableComponent,
  TableColumn,
  TableAction,
} from '../../../../shared/components/generic-table/generic-table';

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './lista-veiculos.html',
})
export class ListaVeiculosComponent implements OnInit {
  veiculos$!: Observable<Veiculo[]>;

  columns: TableColumn[] = [
    { field: 'placa', header: 'Placa' },
    { field: 'modelo', header: 'Modelo' },
    { field: 'marca', header: 'Marca' },
    { field: 'ano', header: 'Ano' },
    {
      field: 'quilometragem',
      header: 'KM',
      format: (v) => (v ? v.toLocaleString() : '0'),
    },
  ];

  actions: TableAction[] = [
    {
      icon: 'eye',
      label: 'Detalhes',
      class: 'bg-blue-500 hover:bg-blue-600',
      onClick: (row) => this.onDetalhes(row.id),
    },
    {
      icon: 'pencil',
      label: 'Editar',
      class: 'bg-yellow-500 hover:bg-yellow-600',
      onClick: (row) => this.onEditar(row.id),
    },
    {
      icon: 'trash',
      label: 'Excluir',
      class: 'bg-red-500 hover:bg-red-600',
      onClick: (row) => this.onExcluir(row.id),
    },
  ];

  constructor(private veiculoService: VeiculoService, private router: Router) {}

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculos$ = this.veiculoService.listarVeiculos();
  }

  onCadastrar() {
    this.router.navigate(['/veiculos/cadastro']);
  }

  onEditar(id: number) {
    this.router.navigate(['/veiculos/editar', id]);
  }

  onExcluir(id: number) {
    if (confirm('Deseja excluir este veículo?')) {
      this.veiculoService.deletarVeiculo(id).subscribe({
        next: () => {
          this.carregarVeiculos(); // Recarrega a lista
        },
        error: (error) => {
          console.error('Erro ao excluir veículo:', error);
          alert('Erro ao excluir veículo');
        },
      });
    }
  }

  onDetalhes(id: number) {
    this.router.navigate(['/veiculos/detalhes', id]);
  }
}

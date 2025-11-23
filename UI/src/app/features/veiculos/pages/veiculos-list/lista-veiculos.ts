// lista-veiculos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Veiculo } from '../../../../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';
import {
  GenericTableComponent,
  TableColumn,
  TableAction,
  TableConfig,
} from '../../../../shared/components/generic-table/generic-table';

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './lista-veiculos.html',
})
export class ListaVeiculosComponent implements OnInit {
  veiculos$!: Observable<Veiculo[]>;

  tableConfig: TableConfig = {
    title: 'Lista de Veiculos',
    addButton: {
      label: 'Adicionar Veículo',
    },
    showFilters: true,
    showBatchActions: true,
    showPagination: true,
  };

  columns: TableColumn[] = [
    { field: 'placa', header: 'Placa' },
    { field: 'modelo', header: 'Modelo' },
    { field: 'marca', header: 'Marca' },
    { field: 'ano', header: 'Ano' },
    {
      field: 'quilometragem',
      header: 'KM',
      format: (v) => (v ? v.toLocaleString('pt-BR') : '0'),
    },
  ];

  actions: TableAction[] = [
    {
      label: 'Editar',
      class: 'bg-blue-600 hover:bg-blue-700',
      onClick: (row) => this.onEditar(row.id),
    },
  ];

  constructor(private veiculoService: VeiculoService, private router: Router) {}

  ngOnInit() {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculos$ = this.veiculoService.listarVeiculos().pipe(
      catchError((error) => {
        console.error('Erro ao carregar veículos:', error);
        return of([]);
      })
    );
  }

  onCadastrar() {
    this.router.navigate(['/veiculos/cadastro']);
  }

  onEditar(id: number) {
    this.router.navigate(['/veiculos/editar', id]);
  }

  onDetalhes(id: number) {
    this.router.navigate(['/veiculos/detalhes', id]);
  }

  onAcaoEmLote() {
    console.log('Ação em lote disparada');
  }
}

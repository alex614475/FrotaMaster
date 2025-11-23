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
  TableFilter,
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
    title: 'Lista de Veículos',
    addButton: {
      label: 'Adicionar Veículo',
    },
    filters: [
      {
        field: 'placa',
        label: 'Placa',
        type: 'text',
        placeholder: 'Digite a placa...',
      },
      {
        field: 'modelo',
        label: 'Modelo',
        type: 'text',
        placeholder: 'Digite o modelo...',
      },
      {
        field: 'marca',
        label: 'Marca',
        type: 'select',
        options: [
          { value: '', label: 'Todas' },
          { value: 'Toyota', label: 'Toyota' },
          { value: 'Honda', label: 'Honda' },
          { value: 'Ford', label: 'Ford' },
          { value: 'Chevrolet', label: 'Chevrolet' },
          { value: 'Volkswagen', label: 'Volkswagen' },
          { value: 'Fiat', label: 'Fiat' },
          { value: 'Hyundai', label: 'Hyundai' },
        ],
      },
      {
        field: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: '', label: 'Todos' },
          { value: 'Ativo', label: 'Ativo' },
          { value: 'Manutenção', label: 'Manutenção' },
          { value: 'Inativo', label: 'Inativo' },
        ],
      },
    ],
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
    { field: 'status', header: 'Status' }, // Apenas o nome, sem formatação
  ];

  actions: TableAction[] = [
    {
      label: 'Editar',
      class: 'bg-blue-600 hover:bg-blue-700',
      onClick: (row) => this.onEditar(row.id),
    },
    {
      label: 'Detalhes',
      class: 'bg-green-600 hover:bg-green-700',
      onClick: (row) => this.onDetalhes(row.id),
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

  // Nova função para lidar com mudanças nos filtros
  onFiltersChange(filters: any) {
    console.log('Filtros aplicados:', filters);
  }
}

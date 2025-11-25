import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { Rota } from '../../../../models/rota.model';
import { RotaService } from '../../services/rota.service';

import {
  GenericTableComponent,
  TableColumn,
  TableAction,
  TableConfig,
  PaginationConfig,
  PaginationEvent,
} from '../../../../shared/components/generic-table/generic-table';

@Component({
  selector: 'app-distribuicao-da-frota-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './distribuicao-da-frota-list.html',
})
export class DistribuicaoDaFrotaListComponent implements OnInit {
  rotas$!: Observable<Rota[]>;

  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  };

  tableConfig: TableConfig = {
    title: 'Distribuição da Frota',
    addButton: {
      label: 'Cadastrar Distribuição',
    },
    filters: [
      {
        field: 'origem',
        label: 'Origem',
        type: 'text',
        placeholder: 'Buscar origem...',
      },
      {
        field: 'destino',
        label: 'Destino',
        type: 'text',
        placeholder: 'Buscar destino...',
      },
      {
        field: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: '', label: 'Todos' },
          { value: 'Agendada', label: 'Agendada' },
          { value: 'Pendente', label: 'Pendente' },
          { value: 'EmAndamento', label: 'Em andamento' },
          { value: 'EmTransito', label: 'Em trânsito' },
          { value: 'Concluida', label: 'Concluída' },
          { value: 'Cancelada', label: 'Cancelada' },
        ],
      },
    ],
    showFilters: true,
    showBatchActions: false,
    showPagination: true,
  };

  columns: TableColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'veiculoId', header: 'Veículo' },
    { field: 'motoristaId', header: 'Motorista' },
    { field: 'origem', header: 'Origem' },
    { field: 'destino', header: 'Destino' },
    { field: 'status', header: 'Status' },
  ];

  actions: TableAction[] = [
    {
      label: 'Detalhes',
      class: 'bg-green-600 hover:bg-green-700',
      onClick: (row) => this.navegarParaDetalhes(row.id),
    },
  ];

  constructor(private rotaService: RotaService, private router: Router) {}

  ngOnInit(): void {
    this.carregarRotas();
  }

  carregarRotas() {
    this.rotas$ = this.rotaService.listarRotas().pipe(
      tap((rotas) => {
        this.paginationConfig.totalItems = rotas.length;
        this.paginationConfig.totalPages = Math.ceil(
          rotas.length / this.paginationConfig.itemsPerPage
        );
      }),
      map((rotas) => {
        const start = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
        const end = start + this.paginationConfig.itemsPerPage;
        return rotas.slice(start, end);
      }),
      catchError((err) => {
        console.error('Erro ao carregar rotas:', err);
        return of([]);
      })
    );
  }

  navegarParaDetalhes(id: number) {
    this.router.navigate(['/distribuicao-da-frota/details', id]);
  }

  onCadastrar() {
    this.router.navigate(['/distribuicao-da-frota-form']);
  }

  onFiltersChange(filters: any) {
    this.carregarRotas();
  }

  onPageChange(event: PaginationEvent) {
    this.paginationConfig.currentPage = event.page;
    this.carregarRotas();
  }
}

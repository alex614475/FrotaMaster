import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { Manutencao } from '../../../../models/manutencao.model';
import { ManutencaoService } from '../../services/manutencao.service';

import {
  GenericTableComponent,
  TableColumn,
  TableAction,
  TableConfig,
  PaginationConfig,
  PaginationEvent,
} from '../../../../shared/components/generic-table/generic-table';

@Component({
  selector: 'app-manutencao-list',
  standalone: true,
  imports: [AsyncPipe, GenericTableComponent],
  templateUrl: './manutencao-list.html',
})
export class ManutencaoListComponent implements OnInit {
  manutencoes$!: Observable<Manutencao[]>;

  // Paginação
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  };

  // CONFIGURAÇÃO TABELA
  tableConfig: TableConfig = {
    title: 'Manutenções de Veículos',
    addButton: {
      label: 'Cadastrar Manutenção',
    },
    showFilters: false,
    showPagination: true,
  };

  // COLUNAS
  columns: TableColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'veiculoModelo', header: 'Veículo' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'descricao', header: 'Descrição' },

    {
      field: 'custo',
      header: 'Custo',
      format: (v) => `R$ ${v?.toFixed(2).replace('.', ',')}`,
    },

    {
      field: 'status',
      header: 'Status',
      format: (_, row) => this.getStatusLabel(row.status),
      class: 'font-semibold',
    },
  ];

  // AÇÕES
  actions: TableAction[] = [
    {
      label: 'Editar',
      class: 'bg-yellow-500 hover:bg-yellow-600',
      onClick: (row) => this.onEditar(row.id),
    },
  ];

  constructor(private manutencaoService: ManutencaoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarManutencoes();
  }

  carregarManutencoes() {
    this.manutencoes$ = this.manutencaoService.listarManutencoes().pipe(
      tap((lista) => {
        this.paginationConfig.totalItems = lista.length;
        this.paginationConfig.totalPages = Math.ceil(
          lista.length / this.paginationConfig.itemsPerPage
        );
      }),
      map((lista) => {
        const start = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
        const end = start + this.paginationConfig.itemsPerPage;
        return lista.slice(start, end);
      }),
      catchError((err) => {
        console.error('Erro ao carregar manutenções', err);
        return of([]);
      })
    );
  }

  // Paginação
  onPageChange(event: PaginationEvent) {
    this.paginationConfig.currentPage = event.page;
    this.paginationConfig.itemsPerPage = event.itemsPerPage;
    this.carregarManutencoes();
  }

  // Ações
  onCadastrar() {
    this.router.navigate(['/manutencao/cadastro']);
  }

  onEditar(id: number) {
    this.router.navigate(['/manutencao/editar', id]);
  }

  // Conversão bonita do status
  getStatusLabel(status: string): string {
    switch (status) {
      case 'Agendada':
        return 'Agendada';
      case 'EmAndamento':
        return 'Em Andamento';
      case 'Concluida':
        return 'Concluída';
      case 'Cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  }
}

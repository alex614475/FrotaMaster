import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Motorista } from '../../../../models/motorista.model';
import { MotoristaService } from '../../services/motorista.service';

import {
  GenericTableComponent,
  TableColumn,
  TableAction,
  TableConfig,
  PaginationConfig,
  PaginationEvent,
} from '../../../../shared/components/generic-table/generic-table';

@Component({
  selector: 'app-lista-motoristas',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './lista-motoristas.html',
})
export class ListaMotoristasComponent implements OnInit {
  motoristas$!: Observable<Motorista[]>;

  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  };

  tableConfig: TableConfig = {
    title: 'Lista de Motoristas',
    addButton: {
      label: 'Cadastrar Motorista',
    },
    showFilters: true,
    showPagination: true,
    filters: [
      { field: 'nome', label: 'Nome', type: 'text' },
      { field: 'cnh', label: 'CNH', type: 'text' },
      {
        field: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: '', label: 'Todos' },
          { value: 'Disponivel', label: 'Disponível' },
          { value: 'EmRota', label: 'Em Rota' },
          { value: 'Inativo', label: 'Inativo' },
        ],
      },
    ],
  };

  columns: TableColumn[] = [
    { field: 'nome', header: 'Nome' },
    { field: 'cnh', header: 'CNH' },
    { field: 'categoriaCNH', header: 'Categoria' },
    { field: 'telefone', header: 'Telefone' },

    {
      field: 'status',
      header: 'Status',
      format: (v: string) =>
        v === 'Disponivel'
          ? 'Disponível'
          : v === 'EmRota'
          ? 'Em Rota'
          : v === 'Inativo'
          ? 'Inativo'
          : v,
    },
  ];

  actions: TableAction[] = [
    {
      label: 'Editar',
      class: 'bg-yellow-500 hover:bg-yellow-600',
      onClick: (row) => this.onEditar(row.id),
    },
  ];

  constructor(private motoristaService: MotoristaService, private router: Router) {}

  ngOnInit(): void {
    this.carregarMotoristas();
  }

  carregarMotoristas() {
    this.motoristas$ = this.motoristaService.listarMotoristas().pipe(
      tap((motoristas) => {
        this.paginationConfig.totalItems = motoristas.length;
        this.paginationConfig.totalPages = Math.ceil(
          motoristas.length / this.paginationConfig.itemsPerPage
        );
      }),
      map((motoristas) => {
        const start = (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
        const end = start + this.paginationConfig.itemsPerPage;
        return motoristas.slice(start, end);
      }),
      catchError(() => of([]))
    );
  }

  onCadastrar() {
    this.router.navigate(['/motoristas/cadastro']);
  }

  onEditar(id: number) {
    this.router.navigate(['/motoristas/editar', id]);
  }

  onPageChange(event: PaginationEvent) {
    this.paginationConfig.currentPage = event.page;
    this.paginationConfig.itemsPerPage = event.itemsPerPage;
    this.carregarMotoristas();
  }

  onFiltersChange(filters: any) {
    console.log('Filtros aplicados:', filters);
    this.carregarMotoristas();
  }
}

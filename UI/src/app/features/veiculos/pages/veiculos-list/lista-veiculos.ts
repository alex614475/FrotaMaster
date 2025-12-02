import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { Veiculo } from '../../../../models/veiculo.model';
import {
  PaginationConfig,
  TableConfig,
  TableColumn,
  TableAction,
  PaginationEvent,
  GenericTable,
} from '../../../../shared/components/generic-table/generic-table';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [GenericTable, AsyncPipe],
  templateUrl: './lista-veiculos.html',
})
export class ListaVeiculos implements OnInit {
  veiculos$!: Observable<Veiculo[]>;

  // Configuração de paginação
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  };

  tableConfig: TableConfig = {
    title: 'Lista de Veículos',
    addButton: {
      label: 'Cadastrar Veículo',
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
    { field: 'status', header: 'Status' },
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
    // Se sua API suporta paginação, use:
    // this.veiculos$ = this.veiculoService.listarVeiculos(
    //   this.paginationConfig.currentPage,
    //   this.paginationConfig.itemsPerPage
    // ).pipe(...)

    // Por enquanto, vamos simular a paginação no cliente
    this.veiculos$ = this.veiculoService.listarVeiculos().pipe(
      tap((veiculos) => {
        // Simulação: calcular totais baseado em todos os dados
        this.paginationConfig.totalItems = veiculos.length;
        this.paginationConfig.totalPages = Math.ceil(
          veiculos.length / this.paginationConfig.itemsPerPage
        );
      }),
      map((veiculos) => {
        // Paginação no cliente (remova isso quando a API fizer paginação)
        const startIndex =
          (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage;
        const endIndex = startIndex + this.paginationConfig.itemsPerPage;
        return veiculos.slice(startIndex, endIndex);
      }),
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

  onFiltersChange(filters: any) {
    console.log('Filtros aplicados:', filters);
    // Aqui você pode implementar filtros no servidor quando necessário
    this.carregarVeiculos(); // Recarrega com os filtros
  }

  // Nova função para lidar com mudanças de página
  onPageChange(event: PaginationEvent) {
    this.paginationConfig.currentPage = event.page;
    this.paginationConfig.itemsPerPage = event.itemsPerPage;
    this.carregarVeiculos();
  }
}

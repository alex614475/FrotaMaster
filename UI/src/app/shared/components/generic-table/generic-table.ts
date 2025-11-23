// generic-table.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  header: string;
  field: string;
  class?: string;
  format?: (value: any, row?: any) => string;
}

export interface TableAction {
  icon?: string;
  label: string;
  class?: string;
  onClick: (row: any) => void;
}

export interface TableFilter {
  field: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'date';
  options?: { value: any; label: string }[];
  placeholder?: string;
}

export interface TableConfig {
  title: string;
  addButton?: {
    label: string;
    icon?: string;
  };
  filters?: TableFilter[];
  showFilters?: boolean;
  showBatchActions?: boolean;
  showPagination?: boolean;
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationEvent {
  page: number;
  itemsPerPage: number;
}

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generic-table.html',
})
export class GenericTableComponent implements OnInit {
  @Input() config: TableConfig = {
    title: 'Lista',
    showFilters: true,
    showBatchActions: true,
    showPagination: true,
  };

  @Input() paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  };

  @Input() columns: TableColumn[] = [];
  @Input() data: any[] | null = [];
  @Input() actions: TableAction[] = [];
  @Input() showCheckbox = true;

  @Output() rowClick = new EventEmitter<any>();
  @Output() addNew = new EventEmitter<void>();
  @Output() batchAction = new EventEmitter<void>();
  @Output() filtersChange = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<PaginationEvent>();

  // Objeto para armazenar os valores dos filtros
  filterValues: any = {};
  filteredData: any[] = [];

  ngOnInit() {
    this.initializeFilters();
  }

  // Inicializa os filtros com valores vazios
  initializeFilters() {
    if (this.config.filters) {
      this.config.filters.forEach((filter) => {
        this.filterValues[filter.field] = '';
      });
    }
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onAddNew() {
    this.addNew.emit();
  }

  onBatchAction() {
    this.batchAction.emit();
  }

  // Aplica os filtros
  onFilter() {
    if (!this.data) return;

    let filtered = [...this.data];

    if (this.config.filters) {
      this.config.filters.forEach((filter) => {
        const value = this.filterValues[filter.field];

        if (value && value !== '') {
          filtered = filtered.filter((item) => {
            const itemValue = item[filter.field];

            switch (filter.type) {
              case 'text':
                return itemValue?.toString().toLowerCase().includes(value.toLowerCase());

              case 'select':
                return itemValue === value;

              case 'number':
                return itemValue == value;

              case 'date':
                // Implementar lógica de data se necessário
                return true;

              default:
                return true;
            }
          });
        }
      });
    }

    this.filteredData = filtered;
    this.filtersChange.emit(this.filterValues);
  }

  // Limpa todos os filtros
  onClearFilters() {
    this.initializeFilters();
    this.filteredData = this.data ? [...this.data] : [];
    this.filtersChange.emit({});
  }

  // Getter para dados exibidos (filtrados ou originais)
  get displayData(): any[] {
    return this.filteredData.length > 0 ? this.filteredData : this.data || [];
  }

  // Verifica se há filtros ativos
  get hasActiveFilters(): boolean {
    if (!this.config.filters) return false;

    return this.config.filters.some(
      (filter) => this.filterValues[filter.field] && this.filterValues[filter.field] !== ''
    );
  }

  // ========== MÉTODOS DE PAGINAÇÃO ==========

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.paginationConfig.totalPages) {
      this.paginationConfig.currentPage = page;
      this.pageChange.emit({
        page: page,
        itemsPerPage: this.paginationConfig.itemsPerPage,
      });
    }
  }

  onItemsPerPageChange(event: any): void {
    const itemsPerPage = parseInt(event.target.value);
    this.paginationConfig.itemsPerPage = itemsPerPage;
    this.paginationConfig.currentPage = 1; // Reset para primeira página
    this.pageChange.emit({
      page: 1,
      itemsPerPage: itemsPerPage,
    });
  }

  // Gerar array de páginas para exibição
  get pages(): number[] {
    const total = this.paginationConfig.totalPages;
    const current = this.paginationConfig.currentPage;
    const delta = 2; // Quantidade de páginas para mostrar ao lado da atual
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    let prev = 0;
    for (const i of range) {
      if (prev !== 0 && i - prev !== 1) {
        rangeWithDots.push(-1); // -1 representa "..."
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  }

  // Informações de exibição
  get startItem(): number {
    return (this.paginationConfig.currentPage - 1) * this.paginationConfig.itemsPerPage + 1;
  }

  get endItem(): number {
    const end = this.paginationConfig.currentPage * this.paginationConfig.itemsPerPage;
    return end > this.paginationConfig.totalItems ? this.paginationConfig.totalItems : end;
  }
}

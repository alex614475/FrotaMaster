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

  @Input() columns: TableColumn[] = [];
  @Input() data: any[] | null = [];
  @Input() actions: TableAction[] = [];
  @Input() showCheckbox = true;

  @Output() rowClick = new EventEmitter<any>();
  @Output() addNew = new EventEmitter<void>();
  @Output() batchAction = new EventEmitter<void>();
  @Output() filtersChange = new EventEmitter<any>();

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
}

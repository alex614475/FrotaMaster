// generic-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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

export interface TableConfig {
  title: string;
  addButton?: {
    label: string;
    icon?: string;
  };
  showFilters?: boolean;
  showBatchActions?: boolean;
  showPagination?: boolean;
}

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-table.html',
})
export class GenericTableComponent {
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

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }

  onAddNew() {
    this.addNew.emit();
  }

  onBatchAction() {
    this.batchAction.emit();
  }
}

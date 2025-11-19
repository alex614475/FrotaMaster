// src/app/modules/gestao-frota/components/lista-veiculos/lista-veiculos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular';

const VEICULOS_MOCK = [
  {
    id: 1,
    placa: 'ABC-1234',
    modelo: 'Volvo FH 540',
    marca: 'Volvo',
    anoFabricacao: 2022,
    status: 'Disponivel',
    ultimaManutencao: new Date('2024-01-15'),
    proximaManutencao: new Date('2024-07-15'),
    quilometragem: 125000,
    valorDiaria: 450.0,
  },
  {
    id: 2,
    placa: 'DEF-5678',
    modelo: 'Mercedes-Benz Actros',
    marca: 'Mercedes',
    anoFabricacao: 2023,
    status: 'Alugado',
    ultimaManutencao: new Date('2024-02-20'),
    proximaManutencao: new Date('2024-08-20'),
    quilometragem: 85000,
    valorDiaria: 520.0,
  },
];

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [CommonModule, DxDataGridModule],
  template: `
    <div class="container">
      <h2>🚗 Gestão de Frota</h2>

      <dx-data-grid [dataSource]="veiculos" [showBorders]="true" keyExpr="id">
        <dxo-paging [pageSize]="10"></dxo-paging>
        <dxo-pager
          [showPageSizeSelector]="true"
          [allowedPageSizes]="[5, 10, 20]"
          [showInfo]="true"
        ></dxo-pager>
        <dxo-search-panel [visible]="true" placeholder="Pesquisar..."></dxo-search-panel>

        <dxi-column dataField="placa" caption="Placa" [width]="100"></dxi-column>
        <dxi-column dataField="modelo" caption="Modelo" [width]="150"></dxi-column>
        <dxi-column dataField="marca" caption="Marca" [width]="100"></dxi-column>
        <dxi-column dataField="anoFabricacao" caption="Ano" [width]="80"></dxi-column>
        <dxi-column dataField="status" caption="Status" [width]="120"></dxi-column>
        <dxi-column
          dataField="quilometragem"
          caption="KM"
          [width]="100"
          dataType="number"
        ></dxi-column>
        <dxi-column
          dataField="valorDiaria"
          caption="Diária"
          [width]="100"
          dataType="number"
          format="currency"
        ></dxi-column>
      </dx-data-grid>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
      }

      h2 {
        color: #1976d2;
        margin-bottom: 20px;
      }
    `,
  ],
})
export class ListaVeiculosComponent implements OnInit {
  veiculos = VEICULOS_MOCK;

  ngOnInit(): void {
    console.log('Lista de veículos carregada');
  }
}

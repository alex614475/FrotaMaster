import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../../../models/veiculo.model';

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [CommonModule, DxDataGridModule],
  templateUrl: './lista-veiculos.component.html',
  styleUrls: ['./lista-veiculos.component.css'],
})
export class ListaVeiculosComponent implements OnInit {
  veiculos: Veiculo[] = [];

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.veiculoService.listarVeiculos().subscribe({
      next: (dados) => {
        this.veiculos = dados;
        console.log('Dados da API:', this.veiculos);
      },
      error: (erro) => {
        console.error('Erro ao carregar veículos', erro);
      },
    });
  }
}

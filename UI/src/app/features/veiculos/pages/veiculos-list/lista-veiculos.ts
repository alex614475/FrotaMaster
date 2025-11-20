import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Veiculo } from '../../../../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-veiculos.html',
})
export class ListaVeiculosComponent {
  veiculos$: Observable<Veiculo[]>;

  constructor(private veiculoService: VeiculoService) {
    this.veiculos$ = this.veiculoService.listarVeiculos();
  }

  onCadastrar() {
    console.log('Cadastrar veículo clicado');
  }
}

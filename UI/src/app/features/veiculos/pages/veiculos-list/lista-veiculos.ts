import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Veiculo } from '../../../../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-veiculos.html',
})
export class ListaVeiculosComponent {
  veiculos$: Observable<Veiculo[]>;

  constructor(private veiculoService: VeiculoService, private router: Router) {
    this.veiculos$ = this.veiculoService.listarVeiculos();
  }

  onCadastrar() {
    this.router.navigate(['/veiculos/cadastro']);
    console.log('Cadastrar Veículo clicado');
  }
}

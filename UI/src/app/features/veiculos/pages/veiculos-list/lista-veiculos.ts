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

  usuarioNome = 'User Name'; // opcional — pode puxar do auth futuramente

  constructor(private veiculoService: VeiculoService, private router: Router) {
    this.veiculos$ = this.veiculoService.listarVeiculos();
  }

  onCadastrar() {
    this.router.navigate(['/veiculos/cadastro']);
  }

  onEditar(id: number) {
    this.router.navigate(['/veiculos/editar', id]);
  }

  onExcluir(id: number) {
    if (confirm('Deseja excluir este veículo?')) {
      this.veiculoService.deletarVeiculo(id).subscribe(() => {
        this.veiculos$ = this.veiculoService.listarVeiculos();
      });
    }
  }

  onDetalhes(id: number) {
    this.router.navigate(['/veiculos/detalhes', id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotoristaService } from '../../services/motorista.service';
import { Motorista } from '../../../../models/motorista.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-motoristas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-motoristas.html',
})
export class ListaMotoristasComponent {
  motoristas$: Observable<Motorista[]>;

  constructor(private motoristaService: MotoristaService) {
    this.motoristas$ = this.motoristaService.listarMotoristas();
  }

  ngOnInit(): void {}

  onCadastrar() {
    console.log('Cadastrar Motorista clicado');
  }
}

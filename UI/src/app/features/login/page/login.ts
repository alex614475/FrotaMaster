import { Component } from '@angular/core';
import { CommonModule, Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // <- MUITO IMPORTANTE
  imports: [CommonModule], // aqui você importa módulos e diretivas
  templateUrl: './login.html',
})
export class LoginComponent {
  constructor(private location: Location) {}

  voltar() {
    this.location.back(); // Volta para a página anterior
  }
}

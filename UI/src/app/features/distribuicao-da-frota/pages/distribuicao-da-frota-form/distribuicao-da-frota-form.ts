// src/app/features/distribuicao-da-frota/pages/distribuicao-da-frota-form/distribuicao-da-frota-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { RotaService } from '../../services/rota.service';
import { Rota } from '../../../../models/rota.model';

@Component({
  selector: 'app-distribuicao-da-frota-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './distribuicao-da-frota-form.component.html',
})
export class DistribuicaoDaFrotaFormComponent implements OnInit {
  rotaForm!: FormGroup;

  constructor(private fb: FormBuilder, private rotaService: RotaService, private router: Router) {}

  ngOnInit(): void {
    this.rotaForm = this.fb.group({
      veiculoId: [null, Validators.required],
      motoristaId: [null, Validators.required],
      origem: ['', Validators.required],
      destino: ['', Validators.required],
      status: ['Agendada', Validators.required],
      carga: ['', Validators.required],
    });
  }

  salvar() {
    if (this.rotaForm.invalid) return;

    const rota: Rota = this.rotaForm.value;
    this.rotaService.criarRota(rota).subscribe(() => {
      this.router.navigate(['/distribuicao-da-frota-list']);
    });
  }
}

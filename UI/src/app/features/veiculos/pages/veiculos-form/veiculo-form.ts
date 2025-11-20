import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../../../models/veiculo.model';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './veiculo-form.html',
})
export class VeiculoFormComponent {
  veiculoForm;

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router
  ) {
    // inicializa o form dentro do construtor
    this.veiculoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}$/i)]],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: [
        '',
        [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())],
      ],
      quilometragem: [0, [Validators.required, Validators.min(0)]],
      status: ['Ativo', Validators.required],
    });
  }

  salvar() {
    if (this.veiculoForm.valid) {
      const formValue = this.veiculoForm.value;
      const veiculo: Veiculo = {
        id: 0,
        placa: formValue.placa!,
        modelo: formValue.modelo!,
        marca: formValue.marca!,
        ano: Number(formValue.ano),
        quilometragem: Number(formValue.quilometragem),
        status: formValue.status!,
        manutencoes: [],
        rotas: [],
      };
      this.veiculoService.criarVeiculo(veiculo).subscribe({
        next: () => {
          alert('Veículo criado com sucesso!');
          this.router.navigate(['/veiculos']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.veiculoForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/veiculos']);
  }
}

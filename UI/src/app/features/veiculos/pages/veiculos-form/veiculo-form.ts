import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  veiculoForm: FormGroup;
  submitted = false;
  loading = false;

  marcas = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen'];
  statusOptions = ['Ativo', 'Inativo', 'Manutenção'];

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router
  ) {
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

  salvar(): void {
    this.submitted = true;

    if (this.veiculoForm.valid) {
      this.loading = true;
      const formValue = this.veiculoForm.value;
      const veiculo: Veiculo = {
        id: 0,
        placa: formValue.placa,
        modelo: formValue.modelo,
        marca: formValue.marca,
        ano: Number(formValue.ano),
        quilometragem: Number(formValue.quilometragem),
        status: formValue.status,

        manutencoes: [],
        rotas: [],
      };

      this.veiculoService.criarVeiculo(veiculo).subscribe({
        next: () => {
          this.loading = false;
          alert('Veículo criado com sucesso!');
          this.router.navigate(['/veiculos']);
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
          alert('Erro ao salvar veículo: ' + err.message);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/veiculos']);
  }

  aplicarMascaraPlaca(event: any): void {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 3) value = value.slice(0, 3) + '-' + value.slice(3, 7);
    this.veiculoForm.patchValue({ placa: value }, { emitEvent: false });
  }
}

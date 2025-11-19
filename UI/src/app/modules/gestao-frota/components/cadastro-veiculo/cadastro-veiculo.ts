// src/app/modules/gestao-frota/components/cadastro-veiculo/cadastro-veiculo.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-cadastro-veiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-veiculo.html',
  styleUrls: ['./cadastro-veiculo.scss'],
})
export class CadastroVeiculoComponent {
  veiculoForm: FormGroup;
  submitted = false;
  loading = false;

  categorias = ['Leve', 'Medio', 'Pesado'];
  marcas = ['Volvo', 'Mercedes-Benz', 'Scania', 'Volkswagen', 'Ford', 'Iveco', 'DAF'];

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router
  ) {
    this.veiculoForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-[0-9]{4}$/)]],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      anoFabricacao: [
        '',
        [Validators.required, Validators.min(2000), Validators.max(new Date().getFullYear())],
      ],
      cor: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      categoria: ['', Validators.required],
      capacidadeCarga: ['', [Validators.required, Validators.min(0)]],
      quilometragem: ['', [Validators.required, Validators.min(0)]],
      valorDiaria: ['', [Validators.required, Validators.min(0)]],
      observacoes: [''],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.veiculoForm.valid) {
      this.loading = true;

      this.veiculoService.criarVeiculo(this.veiculoForm.value).subscribe({
        next: (veiculo) => {
          this.loading = false;
          alert('Veículo cadastrado com sucesso!');
          this.router.navigate(['/frota']);
        },
        error: (error) => {
          this.loading = false;
          alert('Erro ao cadastrar veículo: ' + error.message);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/frota']);
  }
}

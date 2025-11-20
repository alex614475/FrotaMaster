import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './veiculo-form.html',
})
export class VeiculoFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;

  marcas = ['Volvo', 'Mercedes-Benz', 'Scania', 'Volkswagen', 'Ford', 'Iveco', 'DAF'];
  statusOptions = ['Disponivel', 'EmManutencao', 'EmUso'];

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-?[0-9]{4}$/)]],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: [
        '',
        [Validators.required, Validators.min(1980), Validators.max(new Date().getFullYear())],
      ],
      quilometragem: ['', [Validators.required, Validators.min(0)]],
      status: ['Disponivel', Validators.required],
      cor: ['', Validators.required],
    });
  }

  aplicarMascaraPlaca(event: any) {
    let valor = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (valor.length > 3) valor = valor.slice(0, 3) + '-' + valor.slice(3);
    event.target.value = valor;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;

    const dados = {
      ...this.form.value,
      placa: this.form.value.placa.replace('-', ''),
    };

    this.veiculoService.criarVeiculo(dados).subscribe({
      next: () => {
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

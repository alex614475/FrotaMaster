import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../../../models/veiculo.model';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './veiculo-form.html',
})
export class VeiculoForm implements OnInit {
  veiculoForm: FormGroup;
  submitted = false;
  loading = false;
  veiculoId: number | null = null;

  // 👇 ADICIONADO
  titulo = 'Cadastrar Veículo';

  marcas = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen'];
  statusOptions = ['Ativo', 'Inativo', 'Manutenção'];

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id)) {
          this.veiculoId = id;

          // 👇 ATUALIZA O TÍTULO AUTOMATICAMENTE
          this.titulo = 'Editar Veículo';

          this.carregarVeiculo(id);
        }
      }
    });
  }

  carregarVeiculo(id: number) {
    this.veiculoService.obterVeiculo(id).subscribe({
      next: (veiculo: Veiculo) => {
        this.veiculoForm.patchValue({
          placa: veiculo.placa,
          modelo: veiculo.modelo,
          marca: veiculo.marca,
          ano: veiculo.ano,
          quilometragem: veiculo.quilometragem,
          status: veiculo.status,
        });
      },
      error: (err) => {
        alert('Erro ao carregar veículo: ' + err.message);
        this.router.navigate(['/veiculos']);
      },
    });
  }

  salvar(): void {
    this.submitted = true;
    if (this.veiculoForm.valid) {
      this.loading = true;
      const formValue = this.veiculoForm.value;

      const veiculo: Veiculo = {
        id: this.veiculoId || 0,
        placa: formValue.placa,
        modelo: formValue.modelo,
        marca: formValue.marca,
        ano: Number(formValue.ano),
        quilometragem: Number(formValue.quilometragem),
        status: formValue.status,
        manutencoes: [],
        rotas: [],
      };

      if (this.veiculoId) {
        this.veiculoService.atualizarVeiculo(this.veiculoId, veiculo).subscribe({
          next: () => {
            this.loading = false;
            alert('Veículo atualizado com sucesso!');
            this.router.navigate(['/veiculos']);
          },
          error: (err) => {
            this.loading = false;
            alert('Erro ao atualizar veículo: ' + err.message);
          },
        });
      } else {
        this.veiculoService.criarVeiculo(veiculo).subscribe({
          next: () => {
            this.loading = false;
            alert('Veículo criado com sucesso!');
            this.router.navigate(['/veiculos']);
          },
          error: (err) => {
            this.loading = false;
            alert('Erro ao criar veículo: ' + err.message);
          },
        });
      }
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManutencaoService } from '../../services/manutencao.service';
import { VeiculoService } from '../../../veiculos/services/veiculo.service';
import { Veiculo } from '../../../../models/veiculo.model';

@Component({
  selector: 'app-manutencao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manutencao-form.html',
})
export class ManutencaoFormComponent implements OnInit {
  manutencaoForm!: FormGroup;
  submitted = false;
  loading = false;
  manutencaoId: number | null = null;
  veiculos: Veiculo[] = [];
  statusOptions = ['Agendada', 'EmAndamento', 'Concluida', 'Cancelada'];

  constructor(
    private fb: FormBuilder,
    private manutencaoService: ManutencaoService,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.manutencaoForm = this.fb.group({
      veiculoId: ['', Validators.required],
      tipo: ['', Validators.required],
      descricao: ['', Validators.required],
      custo: [0, [Validators.required, Validators.min(0)]],
      status: ['Agendada', Validators.required],
    });

    this.veiculoService.listarVeiculos().subscribe({
      next: (v) => (this.veiculos = v),
      error: () => alert('Erro ao carregar veículos'),
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.manutencaoId = Number(id);
        this.carregarManutencao(this.manutencaoId);
      }
    });
  }

  carregarManutencao(id: number) {
    this.manutencaoService.obterManutencao(id).subscribe({
      next: (m) => {
        this.manutencaoForm.patchValue({
          veiculoId: m.veiculoId,
          tipo: m.tipo,
          descricao: m.descricao,
          custo: m.custo,
          status: m.status,
        });
      },
      error: () => {
        alert('Erro ao carregar manutenção');
        this.router.navigate(['/manutencao']);
      },
    });
  }

  salvar() {
    this.submitted = true;
    this.marcarCamposComoSujos();
    if (this.manutencaoForm.invalid) return;

    this.loading = true;
    const formValue = this.manutencaoForm.value;

    const manutencaoParaEnviar = {
      id: this.manutencaoId || 0,
      veiculoId: Number(formValue.veiculoId),
      tipo: formValue.tipo,
      descricao: formValue.descricao,
      custo: formValue.custo,
      status: formValue.status,
    };

    if (this.manutencaoId) {
      this.manutencaoService
        .atualizarManutencao(this.manutencaoId, manutencaoParaEnviar)
        .subscribe({
          next: () => {
            alert('Manutenção atualizada com sucesso!');
            this.router.navigate(['/manutencao']);
          },
          error: () => {
            alert('Erro ao atualizar manutenção');
            this.loading = false;
          },
          complete: () => (this.loading = false),
        });
    } else {
      this.manutencaoService.criarManutencao(manutencaoParaEnviar).subscribe({
        next: () => {
          alert('Manutenção criada com sucesso!');
          this.router.navigate(['/manutencao']);
        },
        error: () => {
          alert('Erro ao criar manutenção');
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
    }
  }

  private marcarCamposComoSujos(): void {
    Object.keys(this.manutencaoForm.controls).forEach((key) => {
      this.manutencaoForm.get(key)?.markAsTouched();
    });
  }

  cancelar() {
    this.router.navigate(['/manutencao']);
  }
}

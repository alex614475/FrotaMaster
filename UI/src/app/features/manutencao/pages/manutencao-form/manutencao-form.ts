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
export class ManutencaoForm implements OnInit {
  manutencaoForm!: FormGroup;
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
    this.inicializarFormulario();
    this.carregarVeiculos();
    this.verificarModoEdicao();
  }

  inicializarFormulario(): void {
    this.manutencaoForm = this.fb.group({
      veiculoId: ['', Validators.required],
      tipo: ['', Validators.required],
      descricao: ['', Validators.required],
      custo: [0, [Validators.required, Validators.min(0)]],
      status: ['Agendada', Validators.required],
    });
  }

  carregarVeiculos(): void {
    this.veiculoService.listarVeiculos().subscribe({
      next: (v) => (this.veiculos = v),
      error: () => alert('Erro ao carregar veículos'),
    });
  }

  verificarModoEdicao(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.manutencaoId = Number(idParam);
        this.carregarManutencao(this.manutencaoId);
      }
    });
  }

  carregarManutencao(id: number): void {
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

  salvar(): void {
    this.manutencaoForm.markAllAsTouched();

    if (this.manutencaoForm.invalid) return;

    this.loading = true;
    const dados = this.formatarEnvio();

    if (this.manutencaoId) {
      this.atualizar(dados);
    } else {
      this.criar(dados);
    }
  }

  private formatarEnvio() {
    const v = this.manutencaoForm.value;

    return {
      id: this.manutencaoId ?? 0,
      veiculoId: Number(v.veiculoId),
      tipo: v.tipo,
      descricao: v.descricao,
      custo: v.custo,
      status: v.status,
    };
  }

  private atualizar(dados: any): void {
    this.manutencaoService.atualizarManutencao(this.manutencaoId!, dados).subscribe({
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
  }

  private criar(dados: any): void {
    this.manutencaoService.criarManutencao(dados).subscribe({
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

  cancelar(): void {
    this.router.navigate(['/manutencao']);
  }
}

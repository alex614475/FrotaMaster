import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManutencaoService } from '../../services/manutencao.service';
import { Manutencao } from '../../../../models/manutencao.model';

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

  statusOptions = ['Agendada', 'EmAndamento', 'Concluida', 'Cancelada'];

  constructor(
    private fb: FormBuilder,
    private manutencaoService: ManutencaoService,
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
      next: (m: Manutencao) => {
        this.manutencaoForm.patchValue(m);
      },
      error: () => {
        alert('Erro ao carregar manutenção');
        this.router.navigate(['/manutencao']);
      },
    });
  }

  salvar() {
    this.submitted = true;
    if (this.manutencaoForm.invalid) return;

    this.loading = true;
    const manutencao = this.manutencaoForm.value as Manutencao;

    if (this.manutencaoId) {
      // editar
      this.manutencaoService.atualizarManutencao(this.manutencaoId, manutencao).subscribe({
        next: () => {
          alert('Manutenção atualizada');
          this.router.navigate(['/manutencao']);
        },
        error: () => alert('Erro ao atualizar'),
        complete: () => (this.loading = false),
      });
    } else {
      // criar
      this.manutencaoService.criarManutencao(manutencao).subscribe({
        next: () => {
          alert('Manutenção criada');
          this.router.navigate(['/manutencao']);
        },
        error: () => alert('Erro ao criar'),
        complete: () => (this.loading = false),
      });
    }
  }

  cancelar() {
    this.router.navigate(['/manutencao']);
  }
}

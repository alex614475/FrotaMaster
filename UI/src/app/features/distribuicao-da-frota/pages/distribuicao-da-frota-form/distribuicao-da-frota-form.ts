import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  DistribuicaoDaFrotaService,
  DistribuicaoRota,
} from '../../services/distribuicao-da-frota.service';

@Component({
  selector: 'app-distribuicao-da-frota-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './distribuicao-da-frota-form.html',
})
export class DistribuicaoDaFrotaFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  distribuicaoId: number | null = null;

  // Título dinâmico
  titulo = '📍 Cadastro de Distribuição de Rota';

  statusOptions = ['Pendente', 'Em Andamento', 'Concluída', 'Cancelada'];

  constructor(
    private fb: FormBuilder,
    private service: DistribuicaoDaFrotaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      rotaId: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      dataDistribuicao: [new Date().toISOString().split('T')[0], Validators.required],
      status: ['Pendente', Validators.required],
      observacao: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id)) {
          this.distribuicaoId = id;
          this.titulo = '📍 Editar Distribuição de Rota';
          this.carregarDistribuicao(id);
        }
      }
    });
  }

  carregarDistribuicao(id: number) {
    this.service.getDistribuicao(id).subscribe({
      next: (d: DistribuicaoRota) => {
        this.form.patchValue({
          rotaId: d.rotaId,
          latitude: d.latitude,
          longitude: d.longitude,
          dataDistribuicao: d.dataDistribuicao.split('T')[0],
          status: d.status,
          observacao: d.observacao,
        });
      },
      error: (err: any) => {
        alert('Erro ao carregar distribuição: ' + err.message);
        this.router.navigate(['/distribuicao-da-frota-list']);
      },
    });
  }

  salvar() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;
    const dados: DistribuicaoRota = this.form.value;

    const request$ = this.distribuicaoId
      ? this.service.update(this.distribuicaoId, dados)
      : this.service.create(dados);

    request$.subscribe({
      next: () => {
        this.loading = false;
        alert(
          this.distribuicaoId
            ? 'Distribuição atualizada com sucesso!'
            : 'Distribuição registrada com sucesso!'
        );
        this.router.navigate(['/distribuicao-da-frota-list']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error(err);
        alert('Erro ao salvar: ' + err.message);
      },
    });
  }

  cancelar() {
    this.router.navigate(['/distribuicao-da-frota-list']);
  }
}

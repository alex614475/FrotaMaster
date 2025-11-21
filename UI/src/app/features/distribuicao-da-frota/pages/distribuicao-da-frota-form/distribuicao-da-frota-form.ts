import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DistribuicaoDaFrotaService } from '../../services/distribuicao-da-frota.service';

@Component({
  selector: 'app-distribuicao-da-frota-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './distribuicao-da-frota-form.html',
})
export class DistribuicaoDaFrotaFormComponent {
  form: FormGroup;
  submitted = false;
  loading = false;

  statusOptions = ['Pendente', 'Em Andamento', 'Concluída', 'Cancelada'];

  constructor(
    private fb: FormBuilder,
    private service: DistribuicaoDaFrotaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      rotaId: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      dataDistribuicao: [new Date().toISOString().split('T')[0], Validators.required],
      status: ['Pendente'],
      observacao: [''],
    });
  }

  salvar() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;

    this.service.create(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Distribuição registrada com sucesso!');
        this.router.navigate(['/distribuicao-da-frota-list']);
      },
      error: (err) => {
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

// src/app/modules/gestao-frota/components/cadastro-motorista/cadastro-motorista.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MotoristaService } from '../../services/motorista.service';

@Component({
  selector: 'app-cadastro-motorista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-motorista.html',
  styleUrls: ['./cadastro-motorista.scss'],
})
export class CadastroMotoristaComponent {
  motoristaForm: FormGroup;
  submitted = false;
  loading = false;

  categoriasCnh = ['A', 'B', 'C', 'D', 'E'];
  statusOptions = ['Disponivel', 'EmViagem', 'Ferias'];

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private router: Router
  ) {
    this.motoristaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnh: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      categoriaCnh: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      status: ['Disponivel', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.motoristaForm.valid) {
      this.loading = true;

      this.motoristaService.criarMotorista(this.motoristaForm.value).subscribe({
        next: (motorista) => {
          this.loading = false;
          alert('Motorista cadastrado com sucesso!');
          this.router.navigate(['/frota']);
        },
        error: (error) => {
          this.loading = false;
          alert('Erro ao cadastrar motorista: ' + error.message);
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/frota']);
  }

  // Máscara para telefone
  formatarTelefone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/(\d{2})/, '($1)');
    }

    this.motoristaForm.patchValue({ telefone: value });
  }
}

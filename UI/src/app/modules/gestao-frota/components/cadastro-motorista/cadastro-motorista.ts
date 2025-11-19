// src/app/modules/gestao-frota/components/cadastro-motorista/cadastro-motorista.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  estados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.motoristaForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      cnh: ['', Validators.required],
      categoriaCnh: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      observacoes: [''],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.motoristaForm.valid) {
      this.loading = true;
      // Simular cadastro
      setTimeout(() => {
        this.loading = false;
        alert('Motorista cadastrado com sucesso!');
        this.router.navigate(['/frota']);
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/frota']);
  }

  formatarCPF(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
    }

    this.motoristaForm.patchValue({ cpf: value });
  }

  formatarCEP(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.substring(0, 8);

    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    this.motoristaForm.patchValue({ cep: value });
  }
}

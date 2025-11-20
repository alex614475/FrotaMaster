import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MotoristaService } from '../../services/motorista.service';
import { Motorista } from '../../../../models/motorista.model';

@Component({
  selector: 'app-motorista-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './motorista-form.html',
})
export class MotoristaFormComponent {
  motoristaForm;
  categoriasCNH = ['A', 'B', 'C', 'D', 'E'];

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private router: Router
  ) {
    // inicializa o form dentro do construtor
    this.motoristaForm = this.fb.group({
      nome: ['', Validators.required],
      cnh: ['', Validators.required],
      categoriaCNH: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      status: ['Ativo', Validators.required],
    });
  }

  salvar() {
    if (this.motoristaForm.valid) {
      const formValue = this.motoristaForm.value;
      const motorista: Motorista = {
        nome: formValue.nome!,
        cnh: formValue.cnh!,
        categoriaCNH: formValue.categoriaCNH!,
        telefone: formValue.telefone!,
        status: formValue.status!,
        rotas: [],
      };
      this.motoristaService.criarMotorista(motorista).subscribe({
        next: () => {
          alert('Motorista criado com sucesso!');
          this.router.navigate(['/motoristas']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.motoristaForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/motoristas']);
  }
}

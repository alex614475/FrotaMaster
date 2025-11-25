import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoristaService } from '../../services/motorista.service';
import { Motorista } from '../../../../models/motorista.model';

@Component({
  selector: 'app-motorista-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './motorista-form.html',
})
export class CadastroMotoristaComponent implements OnInit {
  motoristaForm: FormGroup;
  submitted = false;
  loading = false;

  motoristaId: number | null = null;

  categoriasCnh = ['A', 'B', 'C', 'D', 'E'];
  statusOptions = ['Disponivel', 'EmViagem', 'Ferias'];

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Formulário padronizado
    this.motoristaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnh: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      categoriaCnh: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      status: ['Disponivel', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.motoristaId = +id;
        this.carregarMotorista(this.motoristaId);
      }
    });
  }

  // Carrega dados no formulário para edição
  carregarMotorista(id: number): void {
    this.motoristaService.obterMotorista(id).subscribe({
      next: (motorista: Motorista) => {
        this.motoristaForm.patchValue({
          nome: motorista.nome,
          cnh: motorista.cnh,
          categoriaCnh: motorista.categoriaCNH,
          telefone: motorista.telefone,
          status: motorista.status,
        });
      },
      error: (err) => {
        alert('Erro ao carregar motorista: ' + err.message);
        this.router.navigate(['/motoristas']);
      },
    });
  }

  // Envio do formulário
  onSubmit(): void {
    this.submitted = true;

    if (this.motoristaForm.invalid) {
      this.motoristaForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const dados: Motorista = {
      id: this.motoristaId || 0,
      nome: this.motoristaForm.value.nome,
      cnh: this.motoristaForm.value.cnh,
      categoriaCNH: this.motoristaForm.value.categoriaCnh,
      telefone: this.motoristaForm.value.telefone,
      status: this.motoristaForm.value.status,
      rotas: [],
    };

    if (this.motoristaId) {
      // Atualizar
      this.motoristaService.atualizarMotorista(this.motoristaId, dados).subscribe({
        next: () => {
          this.loading = false;
          alert('Motorista atualizado com sucesso!');
          this.router.navigate(['/motoristas']);
        },
        error: (error) => {
          this.loading = false;
          alert('Erro ao atualizar motorista: ' + error.message);
        },
      });
    } else {
      // Criar
      this.motoristaService.criarMotorista(dados).subscribe({
        next: () => {
          this.loading = false;
          alert('Motorista cadastrado com sucesso!');
          this.router.navigate(['/motoristas']);
        },
        error: (error) => {
          this.loading = false;
          alert('Erro ao cadastrar motorista: ' + error.message);
        },
      });
    }
  }

  // Cancelar
  onCancel(): void {
    this.router.navigate(['/motoristas']);
  }

  // Máscara de telefone
  formatarTelefone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.substring(0, 11);

    if (value.length >= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    } else if (value.length >= 1) {
      value = value.replace(/(\d{0,2})/, '($1');
    }

    this.motoristaForm.patchValue({ telefone: value }, { emitEvent: false });
  }
}

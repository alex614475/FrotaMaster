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

  motoristaId: number | null = null; // Para diferenciar cadastro e edição

  categoriasCnh = ['A', 'B', 'C', 'D', 'E'];
  statusOptions = ['Disponivel', 'EmViagem', 'Ferias'];

  constructor(
    private fb: FormBuilder,
    private motoristaService: MotoristaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.motoristaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnh: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      categoriaCnh: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      status: ['Disponivel', Validators.required],
    });
  }

  ngOnInit(): void {
    // Verifica se há ID na rota (edição)
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.motoristaId = +id;
        this.carregarMotorista(this.motoristaId);
      }
    });
  }

  // Carrega dados do motorista no formulário
  carregarMotorista(id: number) {
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

  // Chamado pelo (ngSubmit)
  onSubmit(): void {
    this.submitted = true;

    if (this.motoristaForm.valid) {
      this.loading = true;

      // Monta o objeto completo, incluindo ID e rotas (mesmo que vazio)
      const dados: Motorista = {
        id: this.motoristaId || 0, // 0 para backend criar novo
        nome: this.motoristaForm.value.nome,
        cnh: this.motoristaForm.value.cnh,
        categoriaCNH: this.motoristaForm.value.categoriaCnh,
        telefone: this.motoristaForm.value.telefone,
        status: this.motoristaForm.value.status,
        rotas: [], // sempre enviar array vazio se não houver
      };

      if (this.motoristaId) {
        // Edição
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
        // Cadastro
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
    } else {
      this.motoristaForm.markAllAsTouched();
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

    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/(\d{2})/, '($1)');
    }

    this.motoristaForm.patchValue({ telefone: value }, { emitEvent: false });
  }
}

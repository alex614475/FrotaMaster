// src/app/core/models/motorista.model.ts
export interface Motorista {
  id?: number;
  nome: string;
  cpf: string;
  cnh: string;
  categoriaCnh: 'A' | 'B' | 'C' | 'D' | 'E';
  dataNascimento: Date;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  status: 'Ativo' | 'Inativo' | 'Ferias' | 'Afastado';
  dataAdmissao?: Date;
  observacoes?: string;
}

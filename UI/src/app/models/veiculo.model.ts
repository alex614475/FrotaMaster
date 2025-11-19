// src/app/core/models/veiculo.model.ts
export interface Veiculo {
  id?: number;
  placa: string;
  modelo: string;
  marca: string;
  anoFabricacao: number;
  cor: string;
  chassi: string;
  renavam: string;
  status: 'Disponivel' | 'Alugado' | 'Manutencao' | 'Inativo';
  categoria: 'Leve' | 'Medio' | 'Pesado';
  capacidadeCarga: number;
  quilometragem: number;
  valorDiaria: number;
  ultimaManutencao?: Date;
  proximaManutencao?: Date;
  observacoes?: string;
  dataCadastro?: Date;
}

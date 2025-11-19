export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  anoFabricacao: number;
  status: 'Disponivel' | 'Alugado' | 'Manutencao';
  ultimaManutencao: Date;
  proximaManutencao: Date;
  quilometragem: number;
  valorDiaria: number;
  observacoes?: string;
}

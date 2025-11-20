export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  quilometragem: number;
  status: string;
  manutencoes: any[];
  rotas: any[];
}

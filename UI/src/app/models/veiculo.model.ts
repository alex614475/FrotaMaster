import { Status } from './status.model';

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  quilometragem: number;
  status: Status;
  manutencoes: any[];
  rotas: any[];
}

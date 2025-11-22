import { Status } from './status.model';

export interface Manutencao {
  id: number;
  veiculoId: number;
  veiculoModelo: string;
  tipo: string;
  descricao: string;
  custo: number;
  status: Status;
}

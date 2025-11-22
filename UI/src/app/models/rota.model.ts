import { Status } from './status.model';
export interface Rota {
  id?: number;
  veiculoId: number;
  motoristaId: number;
  origem: string;
  destino: string;
  status: Status;
  carga: string;
}

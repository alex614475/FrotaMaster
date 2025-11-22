import { Status } from './status.model';

export interface CreateDistribuicaoRotaRequest {
  rotaId: number;
  latitude: number;
  longitude: number;
  dataDistribuicao: string;
  status?: Status;
  observacao?: string | null;
}

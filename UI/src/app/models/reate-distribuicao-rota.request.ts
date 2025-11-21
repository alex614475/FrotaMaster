export interface CreateDistribuicaoRotaRequest {
  rotaId: number;
  latitude: number;
  longitude: number;
  dataDistribuicao: string;
  status?: string | null;
  observacao?: string | null;
}

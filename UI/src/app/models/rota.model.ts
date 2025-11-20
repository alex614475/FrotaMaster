export interface Rota {
  id?: number;
  veiculoId: number;
  motoristaId: number;
  origem: string;
  destino: string;
  status: 'Agendada' | 'EmTransito' | 'Concluida' | 'Cancelada';
  carga: string;
}

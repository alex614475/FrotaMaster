export interface Manutencao {
  id?: number;
  veiculoId: number;
  tipo: string;
  descricao: string;
  custo: number;
  status: 'Agendada' | 'EmAndamento' | 'Concluida' | 'Cancelada';
}

export interface Motorista {
  id?: number;
  nome: string;
  cnh: string;
  categoriaCnh: string;
  telefone: string;
  status: 'Disponivel' | 'EmViagem' | 'Ferias';
}

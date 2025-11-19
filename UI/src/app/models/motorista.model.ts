export interface Motorista {
  id?: number;
  nome: string;
  cnh: string;
  categoriaCNH: string; // Note: a API está usando "CategoriaCNH" (com N maiúsculo)
  telefone: string;
  status: string;
  rotas?: any[]; // Adicionamos rotas como opcional para evitar erros
}

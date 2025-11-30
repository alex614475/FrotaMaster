export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    perfil: string;
    ativo: boolean;
  };
}

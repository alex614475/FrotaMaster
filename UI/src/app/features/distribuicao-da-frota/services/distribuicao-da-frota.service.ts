import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface DistribuicaoRota {
  id?: number; // opcional, útil para edição
  rotaId: number;
  latitude: number;
  longitude: number;
  dataDistribuicao: string;
  status?: string;
  observacao?: string;
}

@Injectable({ providedIn: 'root' })
export class DistribuicaoDaFrotaService {
  private baseUrl = 'DistribuicaoRota';

  constructor(private api: ApiService) {}

  // Criar nova distribuição
  create(data: DistribuicaoRota): Observable<any> {
    return this.api.post(this.baseUrl, data);
  }

  // Buscar distribuição pelo ID
  getDistribuicao(id: number): Observable<DistribuicaoRota> {
    return this.api.get(`${this.baseUrl}/${id}`);
  }

  // Atualizar distribuição existente
  update(id: number, data: DistribuicaoRota): Observable<any> {
    return this.api.put(`${this.baseUrl}/${id}`, data);
  }

  // Listar todas distribuições
  listar(): Observable<DistribuicaoRota[]> {
    return this.api.get(this.baseUrl);
  }

  // Remover distribuição (opcional)
  delete(id: number): Observable<any> {
    return this.api.delete(`${this.baseUrl}/${id}`);
  }
}

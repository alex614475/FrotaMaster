// src/app/modules/gestao-frota/services/manutencao.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Manutencao } from '../../../models/manutencao.model';

@Injectable({
  providedIn: 'root',
})
export class ManutencaoService {
  private endpoint = 'manutencao';

  constructor(private api: ApiService) {}

  criarManutencao(manutencao: Manutencao): Observable<Manutencao> {
    return this.api.post<Manutencao>(this.endpoint, manutencao);
  }

  listarManutencoes(): Observable<Manutencao[]> {
    return this.api.get<Manutencao[]>(this.endpoint);
  }

  obterManutencao(id: number): Observable<Manutencao> {
    return this.api.get<Manutencao>(`${this.endpoint}/${id}`);
  }

  atualizarManutencao(id: number, manutencao: Manutencao): Observable<Manutencao> {
    return this.api.put<Manutencao>(`${this.endpoint}/${id}`, manutencao);
  }

  deletarManutencao(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}

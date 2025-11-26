import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Manutencao } from '../../../models/manutencao.model';
import { Veiculo } from '../../../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class ManutencaoService {
  private endpoint = 'manutencoes';

  constructor(private api: ApiService) {}

  criarManutencao(manutencao: any): Observable<Manutencao> {
    return this.api.post<Manutencao>(this.endpoint, manutencao);
  }

  listarManutencoes(): Observable<Manutencao[]> {
    return this.api.get<Manutencao[]>(this.endpoint);
  }

  // ✅ Ajuste aqui: inclui Veiculo no tipo
  obterManutencao(id: number): Observable<Manutencao & { Veiculo: Veiculo }> {
    return this.api.get<Manutencao & { Veiculo: Veiculo }>(`${this.endpoint}/${id}`);
  }

  atualizarManutencao(id: number, manutencao: any): Observable<Manutencao> {
    return this.api.put<Manutencao>(`${this.endpoint}/${id}`, manutencao);
  }

  deletarManutencao(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}

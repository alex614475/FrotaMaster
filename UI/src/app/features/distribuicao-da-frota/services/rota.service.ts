// src/app/modules/gestao-frota/services/rota.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Rota } from '../../../models/rota.model';

@Injectable({
  providedIn: 'root',
})
export class RotaService {
  constructor(private api: ApiService) {}

  criarRota(rota: Rota): Observable<Rota> {
    return this.api.post<Rota>('Rota', rota);
  }

  listarRotas(): Observable<Rota[]> {
    return this.api.get<Rota[]>('Rota');
  }

  buscarRotaPorId(id: number): Observable<Rota> {
    return this.api.get<Rota>(`Rota/${id}`);
  }

  atualizarRota(id: number, rota: Rota): Observable<Rota> {
    return this.api.put<Rota>(`Rota/${id}`, rota);
  }

  deletarRota(id: number): Observable<any> {
    return this.api.delete(`Rota/${id}`);
  }
}

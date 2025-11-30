// src/app/modules/gestao-frota/services/veiculo.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../../../models/veiculo.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private endpoint = 'veiculos';

  constructor(private api: ApiService) {}

  criarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.api.post<Veiculo>(this.endpoint, veiculo);
  }

  listarVeiculos(): Observable<Veiculo[]> {
    return this.api.get<Veiculo[]>(this.endpoint);
  }

  obterVeiculo(id: number): Observable<Veiculo> {
    return this.api.get<Veiculo>(`${this.endpoint}/${id}`);
  }

  atualizarVeiculo(id: number, veiculo: Veiculo): Observable<Veiculo> {
    return this.api.put<Veiculo>(`${this.endpoint}/${id}`, veiculo);
  }

  deletarVeiculo(id: number): Observable<any> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}

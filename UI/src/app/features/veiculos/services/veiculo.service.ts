// src/app/modules/gestao-frota/services/veiculo.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Veiculo } from '../../../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  constructor(private api: ApiService) {}

  criarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.api.post<Veiculo>('Veiculo', veiculo);
  }

  listarVeiculos(): Observable<Veiculo[]> {
    return this.api.get<Veiculo[]>('Veiculo');
  }

  obterVeiculo(id: number): Observable<Veiculo> {
    return this.api.get<Veiculo>(`Veiculo/${id}`);
  }

  atualizarVeiculo(id: number, veiculo: Veiculo): Observable<Veiculo> {
    return this.api.put<Veiculo>(`Veiculo/${id}`, veiculo);
  }

  deletarVeiculo(id: number): Observable<any> {
    return this.api.delete(`Veiculo/${id}`);
  }
}

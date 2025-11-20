// src/app/features/motorista/services/motorista.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Motorista } from '../../../models/motorista.model';

@Injectable({
  providedIn: 'root',
})
export class MotoristaService {
  private endpoint = 'Motorista';

  constructor(private api: ApiService) {}

  criarMotorista(motorista: Motorista): Observable<Motorista> {
    return this.api.post<Motorista>(this.endpoint, motorista);
  }

  listarMotoristas(): Observable<Motorista[]> {
    return this.api.get<Motorista[]>(this.endpoint);
  }

  obterMotorista(id: number): Observable<Motorista> {
    return this.api.get<Motorista>(`${this.endpoint}/${id}`);
  }

  atualizarMotorista(id: number, motorista: Motorista): Observable<Motorista> {
    return this.api.put<Motorista>(`${this.endpoint}/${id}`, motorista);
  }

  deletarMotorista(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}

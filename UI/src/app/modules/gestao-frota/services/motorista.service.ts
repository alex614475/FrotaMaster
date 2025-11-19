// src/app/modules/gestao-frota/services/motorista.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Motorista } from '../../../models/motorista.model';

@Injectable({
  providedIn: 'root',
})
export class MotoristaService {
  constructor(private api: ApiService) {}

  criarMotorista(motorista: Motorista): Observable<Motorista> {
    return this.api.post<Motorista>('Motorista', motorista);
  }

  listarMotoristas(): Observable<Motorista[]> {
    return this.api.get<Motorista[]>('Motorista');
  }

  obterMotorista(id: number): Observable<Motorista> {
    return this.api.get<Motorista>(`Motorista/${id}`);
  }

  atualizarMotorista(id: number, motorista: Motorista): Observable<Motorista> {
    return this.api.put<Motorista>(`Motorista/${id}`, motorista);
  }

  deletarMotorista(id: number): Observable<any> {
    return this.api.delete(`Motorista/${id}`);
  }
}

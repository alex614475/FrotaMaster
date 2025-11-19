// src/app/modules/gestao-frota/services/motorista.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Motorista {
  id?: number;
  nome: string;
  cpf: string;
  cnh: string;
  categoriaCnh: string;
  dataNascimento: Date;
  telefone: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class MotoristaService {
  private apiUrl = `${environment.apiUrl}/motoristas`;

  constructor(private http: HttpClient) {}

  criarMotorista(motorista: Motorista): Observable<Motorista> {
    return this.http.post<Motorista>(this.apiUrl, motorista);
  }

  listarMotoristas(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(this.apiUrl);
  }

  obterMotorista(id: number): Observable<Motorista> {
    return this.http.get<Motorista>(`${this.apiUrl}/${id}`);
  }

  atualizarMotorista(id: number, motorista: Motorista): Observable<Motorista> {
    return this.http.put<Motorista>(`${this.apiUrl}/${id}`, motorista);
  }

  excluirMotorista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

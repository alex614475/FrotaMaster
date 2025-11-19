// src/app/core/services/veiculo.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  marca: string;
  anoFabricacao: number;
  status: 'Disponivel' | 'Alugado' | 'Manutencao';
  ultimaManutencao: string;
  proximaManutencao: string;
  quilometragem: number;
  valorDiaria: number;
  observacoes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  constructor(private api: ApiService) {}

  getVeiculos(): Observable<Veiculo[]> {
    return this.api.get<Veiculo[]>('veiculos').pipe(
      catchError((error) => {
        console.warn('Erro ao buscar veículos da API, usando mock:', error);
        return this.getVeiculosMock();
      })
    );
  }

  getVeiculoById(id: number): Observable<Veiculo> {
    return this.api.get<Veiculo>(`veiculos/${id}`);
  }

  criarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.api.post<Veiculo>('veiculos', veiculo);
  }

  atualizarVeiculo(id: number, veiculo: Veiculo): Observable<Veiculo> {
    return this.api.put<Veiculo>(`veiculos/${id}`, veiculo);
  }

  deletarVeiculo(id: number): Observable<any> {
    return this.api.delete(`veiculos/${id}`);
  }

  private getVeiculosMock(): Observable<Veiculo[]> {
    const mockVeiculos: Veiculo[] = [
      {
        id: 1,
        placa: 'ABC-1234',
        modelo: 'Volvo FH 540',
        marca: 'Volvo',
        anoFabricacao: 2022,
        status: 'Disponivel',
        ultimaManutencao: '2024-01-15',
        proximaManutencao: '2024-07-15',
        quilometragem: 125000,
        valorDiaria: 450.0,
      },
      {
        id: 2,
        placa: 'DEF-5678',
        modelo: 'Mercedes-Benz Actros',
        marca: 'Mercedes',
        anoFabricacao: 2023,
        status: 'Alugado',
        ultimaManutencao: '2024-02-20',
        proximaManutencao: '2024-08-20',
        quilometragem: 85000,
        valorDiaria: 520.0,
      },
      {
        id: 3,
        placa: 'GHI-9012',
        modelo: 'Scania R 450',
        marca: 'Scania',
        anoFabricacao: 2021,
        status: 'Manutencao',
        ultimaManutencao: '2024-03-10',
        proximaManutencao: '2024-09-10',
        quilometragem: 185000,
        valorDiaria: 420.0,
      },
    ];

    return of(mockVeiculos).pipe(delay(500));
  }
}

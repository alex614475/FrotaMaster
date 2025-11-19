// src/app/modules/gestao-frota/services/frota.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { VEICULOS_MOCK } from '../../../core/mocks/veiculos.mock';
import { Veiculo } from '../../../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class FrotaService {
  getVeiculos(): Observable<Veiculo[]> {
    // Simula delay de API
    return of(VEICULOS_MOCK).pipe(delay(1000));
  }

  getVeiculoById(id: number): Observable<Veiculo> {
    const veiculo = VEICULOS_MOCK.find((v) => v.id === id);
    return of(veiculo!).pipe(delay(500));
  }
}

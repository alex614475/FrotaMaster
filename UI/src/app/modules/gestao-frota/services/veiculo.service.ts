// src/app/modules/gestao-frota/services/veiculo.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Veiculo } from '../../../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private veiculos: Veiculo[] = [];

  constructor() {}

  criarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    const novoVeiculo = {
      ...veiculo,
      id: this.veiculos.length + 1,
      dataCadastro: new Date(),
      status: 'Disponivel' as const,
    };

    this.veiculos.push(novoVeiculo);
    return of(novoVeiculo).pipe(delay(500));
  }

  listarVeiculos(): Observable<Veiculo[]> {
    return of(this.veiculos).pipe(delay(500));
  }

  obterVeiculo(id: number): Observable<Veiculo> {
    const veiculo = this.veiculos.find((v) => v.id === id);
    return of(veiculo!).pipe(delay(500));
  }

  atualizarVeiculo(id: number, veiculo: Veiculo): Observable<Veiculo> {
    const index = this.veiculos.findIndex((v) => v.id === id);
    if (index !== -1) {
      this.veiculos[index] = { ...veiculo, id };
    }
    return of(this.veiculos[index]).pipe(delay(500));
  }
}

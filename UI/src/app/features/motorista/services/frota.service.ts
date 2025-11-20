// // src/app/modules/gestao-frota/services/frota.service.ts
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// import { Veiculo } from '../../../models/veiculo.model';
// import { VeiculoService } from '../../veiculos/services/veiculo.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class FrotaService {
//   constructor(private veiculoService: VeiculoService) {}

//   getVeiculos(): Observable<Veiculo[]> {
//     return this.veiculoService.listarVeiculos();
//   }

//   getVeiculoById(id: number): Observable<Veiculo> {
//     return this.veiculoService.obterVeiculo(id);
//   }
// }

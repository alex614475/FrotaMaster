import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface CreateDistribuicaoRotaRequest {
  rotaId: number;
  latitude: number;
  longitude: number;
  dataDistribuicao: string;
  status?: string;
  observacao?: string;
}

@Injectable({ providedIn: 'root' })
export class DistribuicaoDaFrotaService {
  constructor(private api: ApiService) {}

  create(data: CreateDistribuicaoRotaRequest): Observable<any> {
    return this.api.post('DistribuicaoRota', data);
  }
}

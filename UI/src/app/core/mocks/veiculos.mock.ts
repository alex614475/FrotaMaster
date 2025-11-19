// src/app/core/mocks/veiculos.mock.ts

import { Veiculo } from '../../models/veiculo.model';

export const VEICULOS_MOCK: Veiculo[] = [
  {
    id: 1,
    placa: 'ABC-1234',
    modelo: 'Volvo FH 540',
    marca: 'Volvo',
    anoFabricacao: 2022,
    status: 'Disponivel',
    ultimaManutencao: new Date('2024-01-15'),
    proximaManutencao: new Date('2024-07-15'),
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
    ultimaManutencao: new Date('2024-02-20'),
    proximaManutencao: new Date('2024-08-20'),
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
    ultimaManutencao: new Date('2024-03-10'),
    proximaManutencao: new Date('2024-09-10'),
    quilometragem: 185000,
    valorDiaria: 420.0,
  },
];

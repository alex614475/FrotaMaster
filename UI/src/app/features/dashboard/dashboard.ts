import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements AfterViewInit {
  veiculosRota = 5;
  veiculosManutencao = 2;
  motoristasAtivos = 3;

  distribuicaoVeiculos = [
    { cidade: 'São Paulo', tipoVeiculo: 'Caminhão', motorista: 'João Silva', status: 'Ativo' },
    {
      cidade: 'Rio de Janeiro',
      tipoVeiculo: 'Carro',
      motorista: 'Maria Santos',
      status: 'Em Atraso',
    },
    {
      cidade: 'Barreiras',
      tipoVeiculo: 'Caminhão',
      motorista: 'Pedro Oliveira',
      status: 'Manutenção',
    },
    {
      cidade: 'Luís Eduardo Magalhães',
      tipoVeiculo: 'Carro',
      motorista: 'Ana Costa',
      status: 'Ativo',
    },
    { cidade: 'Brasília', tipoVeiculo: 'Caminhão', motorista: 'Carlos Souza', status: 'Em Atraso' },
    { cidade: 'Salvador', tipoVeiculo: 'Carro', motorista: 'Juliana Lima', status: 'Ativo' },
  ];

  ngAfterViewInit(): void {
    // Inicializa o mapa centralizado no Brasil
    const map = L.map('map').setView([-15.7942, -47.8822], 4);

    // Tile layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const truckIcon = L.icon({
      iconUrl: 'assets/imagens/truck.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    const carIcon = L.icon({
      iconUrl: 'assets/imagens/car.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    // Marcadores de teste com ícones diferentes
    const veiculos = [
      { lat: -15.7942, lng: -47.8822, nome: 'Caminhão 1', tipo: 'truck' },
      { lat: -23.5505, lng: -46.6333, nome: 'Carro 1', tipo: 'car' },
      { lat: -22.9068, lng: -43.1729, nome: 'Caminhão 2', tipo: 'truck' },
      { lat: -19.9167, lng: -43.9345, nome: 'Carro 2', tipo: 'car' },
      { lat: -12.152, lng: -45.002, nome: 'Caminhão Barreiras', tipo: 'truck' },
    ];

    veiculos.forEach((v) => {
      const icon = v.tipo === 'truck' ? truckIcon : carIcon;
      L.marker([v.lat, v.lng], { icon }).addTo(map).bindPopup(v.nome);
    });
  }

  // Método para definir a cor da borda esquerda com base no status
  getBorderColor(status: string): string {
    switch (status) {
      case 'Ativo':
        return 'border-l-4 border-green-500';
      case 'Em Atraso':
        return 'border-l-4 border-yellow-500';
      case 'Manutenção':
        return 'border-l-4 border-red-500';
      default:
        return 'border-l-4 border-gray-500';
    }
  }

  // Método para definir a classe do badge de status
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Ativo':
        return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
      case 'Em Atraso':
        return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
      case 'Manutenção':
        return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
      default:
        return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
    }
  }
}

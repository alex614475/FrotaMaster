import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [CommonModule], // ← Adicione esta linha
})
export class DashboardComponent implements AfterViewInit {
  veiculosRota = 5;
  veiculosManutencao = 2;
  motoristasAtivos = 3;

  distribuicaoVeiculos = [
    { cidade: 'São Paulo', tipoVeiculo: 'Caminhão', motorista: 'João Silva' },
    { cidade: 'Rio de Janeiro', tipoVeiculo: 'Carro', motorista: 'Maria Santos' },
    { cidade: 'Barreiras', tipoVeiculo: 'Caminhão', motorista: 'Pedro Oliveira' },
    { cidade: 'Luís Eduardo Magalhães', tipoVeiculo: 'Carro', motorista: 'Ana Costa' },
  ];

  ngAfterViewInit(): void {
    // Inicializa o mapa centralizado no Brasil
    const map = L.map('map').setView([-15.7942, -47.8822], 4);

    // Tile layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const truckIcon = L.icon({
      iconUrl: '/imagens/truck.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    const carIcon = L.icon({
      iconUrl: '/imagens/car.png',
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
}

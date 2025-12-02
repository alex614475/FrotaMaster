import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './dashboard-map.html',
  styleUrls: [],
})
export class DashboardMap implements OnInit {
  private map!: L.Map;

  // Valores fixos para teste
  private vehiclePositions = [
    { lat: -23.55052, lng: -46.633308, name: 'Veículo 1' },
    { lat: -23.547, lng: -46.635, name: 'Veículo 2' },
    { lat: -23.555, lng: -46.64, name: 'Veículo 3' },
    { lat: -12.152, lng: -45.002, name: 'Caminhão Barreiras', tipo: 'truck' },
    { lat: -12.091, lng: -45.795, name: 'Carro LEM', tipo: 'car' },
    { lat: -12.121, lng: -45.398, name: 'Caminhão em Transito', tipo: 'truck' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-23.55052, -46.633308], // centro do mapa
      zoom: 13,
    });

    // Adiciona o tile do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Adiciona os veículos
    this.vehiclePositions.forEach((v) => {
      L.marker([v.lat, v.lng]).addTo(this.map).bindPopup(`<b>${v.name}</b>`).openPopup();
    });
  }
}

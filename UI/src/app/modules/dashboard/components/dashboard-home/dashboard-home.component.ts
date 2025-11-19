// src/app/modules/dashboard/components/dashboard-home/dashboard-home.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VeiculoService, Veiculo } from '../../../../core/services/veiculo.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <h2>📊 Dashboard - FrotaMaster</h2>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ totalVeiculos }}</div>
          <div class="stat-label">Total de Veículos</div>
        </div>

        <div class="stat-card available">
          <div class="stat-value">{{ veiculosDisponiveis }}</div>
          <div class="stat-label">Disponíveis</div>
        </div>

        <div class="stat-card rented">
          <div class="stat-value">{{ veiculosAlugados }}</div>
          <div class="stat-label">Alugados</div>
        </div>

        <div class="stat-card maintenance">
          <div class="stat-value">{{ veiculosManutencao }}</div>
          <div class="stat-label">Em Manutenção</div>
        </div>
      </div>

      <div class="quick-actions">
        <h3>Ações Rápidas</h3>
        <div class="actions-grid">
          <button class="action-btn" routerLink="/frota">📋 Ver Todos Veículos</button>
          <button class="action-btn" routerLink="/frota/novo">➕ Novo Veículo</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 20px;
      }

      h2 {
        color: #1976d2;
        margin-bottom: 30px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .stat-card {
        background: white;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        border-left: 4px solid #1976d2;
      }

      .stat-card.available {
        border-left-color: #4caf50;
      }

      .stat-card.rented {
        border-left-color: #ff9800;
      }

      .stat-card.maintenance {
        border-left-color: #f44336;
      }

      .stat-value {
        font-size: 2.5rem;
        font-weight: bold;
        color: #333;
      }

      .stat-label {
        color: #666;
        font-size: 0.9rem;
        margin-top: 5px;
      }

      .quick-actions {
        background: white;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 15px;
      }

      .action-btn {
        background: #1976d2;
        color: white;
        border: none;
        padding: 15px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
      }

      .action-btn:hover {
        background: #1565c0;
      }
    `,
  ],
})
export class DashboardHomeComponent implements OnInit {
  private veiculoService = inject(VeiculoService);

  totalVeiculos = 0;
  veiculosDisponiveis = 0;
  veiculosAlugados = 0;
  veiculosManutencao = 0;

  ngOnInit(): void {
    this.carregarEstatisticas();
  }

  carregarEstatisticas(): void {
    this.veiculoService.getVeiculos().subscribe((veiculos: Veiculo[]) => {
      this.totalVeiculos = veiculos.length;
      this.veiculosDisponiveis = veiculos.filter((v: Veiculo) => v.status === 'Disponivel').length;
      this.veiculosAlugados = veiculos.filter((v: Veiculo) => v.status === 'Alugado').length;
      this.veiculosManutencao = veiculos.filter((v: Veiculo) => v.status === 'Manutencao').length;
    });
  }
}

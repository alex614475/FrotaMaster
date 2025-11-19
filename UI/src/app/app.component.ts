// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <h1>🚗 FrotaMaster - Sistema de Gestão</h1>
        <a routerLink="/frota" class="nav-link"> 📊 Gestão de Frota </a>
      </div>
    </nav>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .navbar {
        background: #1976d2;
        color: white;
        padding: 1rem 0;
      }

      .nav-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
      }

      h1 {
        margin: 0;
        font-size: 1.5rem;
      }

      .nav-link {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border: 1px solid white;
        border-radius: 4px;
      }

      .nav-link:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .main-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'FrotaMaster';
}

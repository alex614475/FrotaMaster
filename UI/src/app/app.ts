import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar';
import { FooterComponent } from './layout/footer/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-navbar></app-navbar>

    <div class="min-h-screen">
      <router-outlet></router-outlet>
    </div>

    <app-footer></app-footer>
  `,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
})
export class App {}

// certifique-se do caminho e nome
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/navbar';
import { NgIf } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-navbar *ngIf="showLayout"></app-navbar>

    <div class="min-h-screen">
      <router-outlet></router-outlet>
    </div>

    <app-footer *ngIf="showLayout"></app-footer>
  `,
  imports: [RouterOutlet, Navbar, Footer, NgIf],
})
export class App {
  showLayout = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showLayout = !event.url.includes('/login');
      });
  }
}

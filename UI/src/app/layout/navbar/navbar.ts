import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { STORAGE_TOKEN, STORAGE_USER } from '../../core/services/storage.service.constants';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  openProfile = false;
  openMobile = false;

  isLogged = false;
  userEmail: string = '';
  isLoginPage = false;

  constructor(private storage: StorageService, private router: Router) {}

  ngOnInit() {
    this.checkLogin();
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url.includes('/login');
      this.checkLogin();
    });
  }

  /** Verifica se está logado e busca dados do usuário */
  checkLogin() {
    const token = this.storage.getItem(STORAGE_TOKEN);
    const user = this.storage.getItem<any>(STORAGE_USER);

    this.isLogged = !!token;

    if (user && user.email) {
      this.userEmail = user.email;
    }
  }

  toggleProfile() {
    this.openProfile = !this.openProfile;
  }

  toggleMobile() {
    this.openMobile = !this.openMobile;
  }

  logout() {
    this.storage.clear();
    window.location.href = '/login';
  }
}

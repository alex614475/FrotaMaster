import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  openProfile = false;
  openMobile = false;

  toggleProfile() {
    this.openProfile = !this.openProfile;
  }

  toggleMobile() {
    this.openMobile = !this.openMobile;
  }
}

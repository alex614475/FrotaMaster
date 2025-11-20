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
  openMobile = false;
  openProfile = false;

  toggleMobile() {
    this.openMobile = !this.openMobile;
  }

  toggleProfile() {
    this.openProfile = !this.openProfile;
  }
}

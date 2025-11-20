import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  openMobile = false;
  openProfile = false;

  toggleMobile() {
    this.openMobile = !this.openMobile;
  }

  toggleProfile() {
    this.openProfile = !this.openProfile;
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertService } from './Alert.service';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  constructor(public alertService: AlertService) {}
}

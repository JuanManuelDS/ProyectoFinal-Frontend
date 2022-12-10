import { Component, Input } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css'],
})
export class AdminMenuComponent {
  constructor(private adminService: AdminService) {}

  cambiarTabla(tabla: string) {
    this.adminService.cambiarTabla(tabla);
  }
}

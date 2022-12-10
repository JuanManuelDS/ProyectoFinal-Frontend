import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  get tablaSeleccionada() {
    return this.adminService.tablaSeleccionada;
  }

  constructor(private adminService: AdminService) {}

  ngOnInit() {}
}

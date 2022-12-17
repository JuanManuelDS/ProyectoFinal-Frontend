import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.cargarUsuarios().subscribe();
  }

  get usuarios() {
    return this.adminService.usuariosBuscados;
  }
}

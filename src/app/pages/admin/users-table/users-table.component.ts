import { Component, OnInit } from '@angular/core';
import { sequenceEqual } from 'rxjs';
import { Content, Rol } from 'src/app/models/paginacion.interface';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  infoUsuario: Content | undefined;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.cargarUsuarios().subscribe();
  }

  detallesUsuario(nombreUsuario: string) {
    this.adminService.cargarUsuario(nombreUsuario).subscribe((resp) => {
      Swal.fire({
        html: `
        <div>
          <span class="mb-2"><strong>Id:</strong> ${resp.id}</span><br />
          <span class="mb-2"><strong>Nombre de usuario:</strong> ${
            resp.nombreUsuario
          }</span><br />
          <span class="mb-2"><strong>Email:</strong> ${resp.email}</span><br />
          <span class="mb-2"><strong>Última actividad:</strong> ${
            resp.lastLogin
          }</span><br />
          <span class="mb-2"><strong>Roles: </strong> ${resp.roles
            ?.trim()
            .toLocaleLowerCase()
            .replaceAll(' ', ', ')}</span><br />

        </div>
        `,
      });
      console.log(resp);
    });
  }

  get usuarios() {
    return this.adminService.usuariosBuscados;
  }
}

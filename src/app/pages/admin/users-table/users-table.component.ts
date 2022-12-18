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

  eliminarUsuario(nombreUsuario: string) {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar el usuario?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.eliminarUsuario(nombreUsuario).subscribe((resp) => {
          Swal.fire('Usuario eliminado', '', 'success');
        });
      }
    });
  }

  async editarRol(nombreUsuario: string) {
    const roleName = await Swal.fire({
      title: 'Seleccione el rol que desea agregar',
      input: 'select',
      inputOptions: {
        ADMIN: 'Admin',
        USER: 'User',
      },
      inputPlaceholder: 'Seleccionar rol',
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise((resolve: any) => {
          if (value === '') {
            resolve('Por favor, selecciona una opción');
          } else resolve();
        });
      },
    });
    this.adminService
      .editarRol(nombreUsuario, roleName.value)
      .subscribe((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Rol agregado correctamente!',
        });
      });
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
    });
  }

  get usuarios() {
    return this.adminService.usuariosBuscados;
  }
}

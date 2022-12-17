import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboardUsuario',
  templateUrl: './dashboardUsuario.component.html',
  styleUrls: ['./dashboardUsuario.component.css'],
})
export class DashboardUsuarioComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  async nuevaPlantilla() {
    const eleccion = await Swal.fire({
      title: 'Seleccione una plantilla',
      input: 'select',
      inputOptions: {
        CV: 'Curriculum',
        CR: 'Carta de Restaurante',
        LI: 'Listado',
      },
      inputPlaceholder: 'Seleccionar plantilla',
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise((resolve: any) => {
          if (value === '') {
            resolve('Por favor, selecciona una opción');
          } else resolve();
        });
      },
    });

    //Redirecciono al cliente
    switch (eleccion.value) {
      case 'CV':
        this.router.navigateByUrl('/nueva-plantilla/curriculum');
        break;
      case 'CR':
        this.router.navigateByUrl('/nueva-plantilla/cartaRestaurante');
        break;
      case 'LI':
        this.router.navigateByUrl('/nueva-plantilla/listado');
        break;
    }
  }
}

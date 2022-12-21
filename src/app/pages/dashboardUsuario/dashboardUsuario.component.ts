import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plantilla } from 'src/app/models/plantillas.interface';
import { PlantillasService } from 'src/app/services/plantillas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboardUsuario',
  templateUrl: './dashboardUsuario.component.html',
  styleUrls: ['./dashboardUsuario.component.css'],
})
export class DashboardUsuarioComponent implements OnInit {
  plantillas: Plantilla[] = [];
  imagenListado: string = 'assets/ejemplo-listado.jpg';
  imagenCv: string = 'assets/ejemplo-cv.jpg';
  imagenCr: string = 'assets/ejemplo-cr.jpg';
  loading: boolean = true;

  constructor(
    private router: Router,
    private plantillasService: PlantillasService
  ) {}

  ngOnInit() {
    this.plantillasService.getPlantillas().subscribe((resp) => {
      this.plantillas = resp;
      setTimeout(() => {
        this.loading = false;
      }, 350);
    });
  }

  abrirPlantilla(id: number, tipo: string) {
    let ruta = '/nueva-plantilla/';
    switch (tipo) {
      case 'listado':
        ruta += 'listado/';
        break;
      case 'curriculum':
        ruta += 'curriculum/';
        break;
      case 'cartaRestaurante':
        ruta += 'cartaRestaurante/';
        break;
    }
    this.router.navigateByUrl(ruta + id);
  }

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
      cancelButtonColor: '#CF1414',
      confirmButtonColor: '#1CC464',
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

  borrarPlantilla(id: number) {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar la plantilla?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#1CC464',
      confirmButtonColor: '#CF1414',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.plantillasService.deletePlantilla(id).subscribe((resp) => {
          Swal.fire('Usuario eliminado', '', 'success');
          this.plantillasService.getPlantillas().subscribe((resp) => {
            this.plantillas = resp;
          });
        });
      }
    });
  }
}

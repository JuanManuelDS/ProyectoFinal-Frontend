import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plantilla } from 'src/app/models/plantillas.interface';
import { PlantillasService } from 'src/app/services/plantillas.service';

@Component({
  selector: 'app-crearPlantilla',
  templateUrl: './crearPlantilla.component.html',
  styleUrls: ['./crearPlantilla.component.css'],
})
export class CrearPlantillaComponent implements OnInit {
  plantilla: string | null = '';
  imprimir: boolean = false;

  curriculum: boolean = false;
  listado: boolean = false;
  cartaRestaurante: boolean = false;

  plantillaDoc: Plantilla | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private plantillaService: PlantillasService
  ) {}

  ngOnInit() {
    this.plantilla = this.activatedRoute.snapshot.paramMap.get('plantilla');
    this.imprimir = true;
    
    if (this.plantilla === '') {
      this.router.navigateByUrl('/dashboard');
    }
  }

  generarListado(valor: boolean) {
    this.listado = valor;
  }

  generarCV(valor: boolean) {
    this.curriculum = true;
  }

  generarCR(valor: boolean) {
    this.cartaRestaurante = true;
  }
}

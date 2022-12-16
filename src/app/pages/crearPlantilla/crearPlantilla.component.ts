import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartarestaurant } from 'src/app/models/cartarestaurant.interface';

@Component({
  selector: 'app-crearPlantilla',
  templateUrl: './crearPlantilla.component.html',
  styleUrls: ['./crearPlantilla.component.css'],
})
export class CrearPlantillaComponent implements OnInit {
  plantilla: string | null = '';

  curriculum: boolean = false;
  listado: boolean = false;
  cartaRestaurante: Cartarestaurant | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.plantilla = this.activatedRoute.snapshot.paramMap.get('plantilla');
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
}

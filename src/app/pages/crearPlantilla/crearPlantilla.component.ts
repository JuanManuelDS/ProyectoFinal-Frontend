import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curriculum } from 'src/app/models/curriculum.interface';
import { Listado } from 'src/app/models/listado.interface';

@Component({
  selector: 'app-crearPlantilla',
  templateUrl: './crearPlantilla.component.html',
  styleUrls: ['./crearPlantilla.component.css'],
})
export class CrearPlantillaComponent implements OnInit {
  plantilla: string | null = '';

  curriculum: Curriculum | undefined;
  listado: boolean = false;

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

}

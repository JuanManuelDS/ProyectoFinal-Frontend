import { Component } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css'],
})
export class CurriculumComponent {
  get datos() {
    return this.cvService.datos;
  }

  get experiencias() {
    return this.cvService.experiencias;
  }

  get estudios() {
    return this.cvService.estudios;
  }

  get conocimientos() {
    return this.cvService.conocimientos;
  }

  get idiomas() {
    return this.cvService.idiomas;
  }

  get datosInteres() {
    return this.cvService.datosInteres;
  }

  constructor(private cvService: CurriculumService) {}
}

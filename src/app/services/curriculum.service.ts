import { Injectable } from '@angular/core';
import { Datos } from '../models/curriculum.interface';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  private _datos: Datos | undefined;

  constructor() {}

  get datos() {
    return this._datos;
  }

  agregarDatos(datos: Datos) {
    this._datos = datos;
  }
}

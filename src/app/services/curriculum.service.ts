import { Injectable } from '@angular/core';
import { Datos, Estudio, Experiencia } from '../models/curriculum.interface';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  private _datos: Datos | undefined;
  private _experiencias: Experiencia[] = [];
  private _estudios: Estudio[] = [];
  constructor() {}

  get datos() {
    return this._datos;
  }

  get experiencias() {
    return this._experiencias;
  }

  get estudios() {
    return this._estudios;
  }

  agregarDatos(datos: Datos) {
    this._datos = datos;
  }

  agregarExperiencia(experiencia: Experiencia) {
    this._experiencias.push(experiencia);
  }

  agregarEstudio(estudio: Estudio) {
    this._estudios.push(estudio);
  }

  eliminarEstudio(index: number) {
    this._estudios.splice(index, 1);
  }
  
  eliminarExperiencia(index: number) {
    this._experiencias.splice(index, 1);
  }
}

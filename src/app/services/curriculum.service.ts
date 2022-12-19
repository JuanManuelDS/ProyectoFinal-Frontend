import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  Conocimiento,
  Curriculum,
  Datos,
  DatosInteres,
  Estudio,
  Experiencia,
  Idioma,
} from '../models/curriculum.interface';
import { Plantilla } from '../models/plantillas.interface';
import { PlantillasService } from './plantillas.service';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  private _datos: Datos | undefined;
  private _experiencias: Experiencia[] = [];
  private _estudios: Estudio[] = [];
  private _conocimientos: Conocimiento[] = [];
  private _idiomas: Idioma[] = [];
  private _datosInteres: DatosInteres[] = [];
  nombreArchivo: string = '';

  constructor(
    private fb: FormBuilder,
    private plantillaService: PlantillasService
  ) {}

  get datos() {
    return this._datos;
  }

  get experiencias() {
    return this._experiencias;
  }

  get estudios() {
    return this._estudios;
  }

  get conocimientos() {
    return this._conocimientos;
  }

  get idiomas() {
    return this._idiomas;
  }

  get datosInteres() {
    return this._datosInteres;
  }

  guardarCv() {
    const cv: Curriculum = {
      datos: this._datos,
      datosInteres: this._datosInteres,
      idiomas: this._idiomas,
      experiencias: this._experiencias,
      estudios: this._estudios,
      conocimientos: this._conocimientos,
    };
    const plantilla: Plantilla = {
      nombreArchivo: this.nombreArchivo,
      tipo: 'curriculum',
      datos: JSON.stringify(cv),
    };
    this.plantillaService.guardarPlantilla(plantilla).subscribe((resp) => {
      console.log(resp);
    });
  }

  agregarDatoInteres(datoInteres: DatosInteres) {
    this._datosInteres.push(datoInteres);
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

  agregarConocimiento(conocimiento: Conocimiento) {
    this._conocimientos.push(conocimiento);
  }

  agregarIdioma(idioma: Idioma) {
    this._idiomas.push(idioma);
  }

  eliminarEstudio(index: number) {
    this._estudios.splice(index, 1);
  }

  eliminarExperiencia(index: number) {
    this._experiencias.splice(index, 1);
  }

  eliminarConocimiento(index: number) {
    this._conocimientos.splice(index, 1);
  }

  eliminarIdioma(index: number) {
    this._idiomas.splice(index, 1);
  }

  eliminarDatoInteres(index: number) {
    this._datosInteres.splice(index, 1);
  }

  limpiarDatos() {
    this._datos = undefined;
  }
}

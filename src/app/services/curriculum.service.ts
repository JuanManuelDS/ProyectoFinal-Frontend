import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  private _imprimirPlantilla: boolean = false;
  private _idPlantilla: number | undefined;

  constructor(
    private fb: FormBuilder,
    private plantillaService: PlantillasService,
    private router: Router
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

  get idPlantilla() {
    return this._idPlantilla;
  }

  get imprimirPlantilla() {
    return this._imprimirPlantilla;
  }

  resetearDatos() {
    this._datos = undefined;
    this._experiencias = [];
    this._estudios = [];
    this._conocimientos = [];
    this._idiomas = [];
    this._datosInteres = [];
  }

  actualizarCv(id: number, nombreArchivo: string) {
    const cv: Curriculum = {
      datos: this._datos,
      datosInteres: this._datosInteres,
      idiomas: this._idiomas,
      experiencias: this._experiencias,
      estudios: this._estudios,
      conocimientos: this._conocimientos,
    };
    const plantilla: Plantilla = {
      id: id,
      nombreArchivo,
      tipo: 'curriculum',
      datos: JSON.stringify(cv),
    };
    this.plantillaService
      .actualizarPlantilla(id, plantilla)
      .subscribe((resp) => {
        console.log('plantilla actualizada con éxito');
        this.router.navigateByUrl('/nueva-plantilla/curriculum/' + id);
      });
  }

  guardarCv(nombreArchivo: string) {
    const cv: Curriculum = {
      datos: this._datos,
      datosInteres: this._datosInteres,
      idiomas: this._idiomas,
      experiencias: this._experiencias,
      estudios: this._estudios,
      conocimientos: this._conocimientos,
    };
    const plantilla: Plantilla = {
      nombreArchivo,
      tipo: 'curriculum',
      datos: JSON.stringify(cv),
    };
    this.plantillaService.guardarPlantilla(plantilla).subscribe((resp) => {
      this._idPlantilla = resp.id;
      this.router.navigateByUrl(
        '/nueva-plantilla/curriculum/' + this._idPlantilla
      );
    });
  }

  imprimir() {
    this._imprimirPlantilla = true;
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

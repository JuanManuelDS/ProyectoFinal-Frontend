import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cartarestaurant, Menu, Plato, Seccion } from '../models/cartarestaurant.interface';
import { Plantilla } from '../models/plantillas.interface';
import { PlantillasService } from './plantillas.service';

@Injectable({
  providedIn: 'root'
})
export class CartaRestauranteService {

  private _nombre: string = '';
  private _portada: any;
  private _secciones: Seccion[] = [];
  private _menus: Menu[] = [];
  private _platos: Plato[] = [];
  nombreArchivo: string = '';

constructor(private plantillaService: PlantillasService, private router: Router) { }

get nombre() {
  return this._nombre;
}

get secciones() {
  return this._secciones;
}

get menus() {
  return this._menus;
}

get platos() {
  return this._platos;
}

get portada() {
  return this._portada;
}

// ------------------- ADD -------------------
addNombre(nombre: string) {
  this._nombre = nombre;
}

addSeccion(seccion: Seccion) {
  this._secciones.push(seccion);
}

addMenu(menu: Menu) {
  this._menus.push(menu);
}

addPlato(plato: Plato) {
  this._platos.push(plato);
}

addPortada(file: any){
  this._portada = file;
}

// ----------------- ELIMINAR ----------------
eliminarSeccion(index: number) {
  this._secciones.splice(index, 1);
}

eliminarMenu(index: number) {
  this._menus.splice(index, 1);
}

eliminarPlato(index: number) {
  this._platos.splice(index, 1);
}

resetearCarta() {
  this._nombre = '';
  this._portada = undefined;
  this._menus = [];
  this._secciones = [];
  this._platos = [];
}

guardarCR() {
  const cr: Cartarestaurant = {
    nombre: this._nombre,
    imagen: this._portada,
    secciones: this._secciones,
    menus: this._menus
  };
  const plantilla: Plantilla = {
    nombreArchivo: this.nombreArchivo,
    tipo: 'cartaRestaurante',
    datos: JSON.stringify(cr)
  };

  this.plantillaService.guardarPlantilla(plantilla).subscribe((res) => {
    this.router.navigateByUrl('/nueva-plantilla/cartaRestaurante/'+res.id);
  })
}

actualizarCR(id: number) {
  const cr: Cartarestaurant = {
    nombre: this._nombre,
    imagen: this._portada,
    secciones: this._secciones,
    menus: this._menus
  };
  const plantilla: Plantilla = {
    nombreArchivo: this.nombreArchivo,
    tipo: 'cartaRestaurante',
    datos: JSON.stringify(cr)
  };

  this.plantillaService.actualizarPlantilla(id, plantilla).subscribe((res) => {
    console.log(res);
  });
}

}

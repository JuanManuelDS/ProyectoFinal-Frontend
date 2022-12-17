import { Injectable } from '@angular/core';
import { Menu, Plato, Seccion } from '../models/cartarestaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class CartaRestauranteService {

  private _nombre: string = '';
  private _portada: any;
  private _secciones: Seccion[] = [];
  private _menus: Menu[] = [];
  private _platos: Plato[] = [];

constructor() { }

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

}

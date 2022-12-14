import { Injectable } from '@angular/core';
import { Item } from '../models/listado.interface';

@Injectable({
  providedIn: 'root',
})
export class ListadoService {
  private _listado: Item[] = [];
  private _titulo: string = '';
  private _imagen: any;

  get listado() {
    return this._listado;
  }

  get titulo() {
    return this._titulo;
  }

  get imagen() {
    return this._imagen;
  }

  guardarItem(item: Item) {
    this._listado.push(item);
  }

  eliminarItem(index: number) {
    this._listado.splice(index, 1);
  }

  cambiarTitulo(titulo: string) {
    this._titulo = titulo;
  }

  cargarImagen(file: any) {
    console.log(file);
    this._imagen = file;
  }

  constructor() {}
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _tablaSeleccionada: string = 'users';

  get tablaSeleccionada() {
    return this._tablaSeleccionada;
  }

  cambiarTabla(tabla: string) {
    this._tablaSeleccionada = tabla;
  }
}

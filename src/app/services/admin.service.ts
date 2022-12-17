import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Usuario } from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _tablaSeleccionada: string = 'users';
  private _usuarios: Usuario[] = [];
  private _usuariosBuscados: Usuario[] = [];

  constructor(private http: HttpClient) {}

  cargarUsuarios() {
    const url =
      'https://proyectofinal-backend-production.up.railway.app/api/usuarios';
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token ? token : '');
    return this.http.get<Usuario[]>(url, { headers }).pipe(
      tap((resp) => {
        this._usuarios = resp;
        this._usuariosBuscados=resp
      })
    );
  }

  cargarUsuarioBuscado(termino: string) {
    const usuarios = this._usuarios.filter((user) =>
      user.nombreUsuario.toLowerCase().includes(termino.toLowerCase())
    );
    this._usuariosBuscados = usuarios;
  }

  cambiarTabla(tabla: string) {
    this._tablaSeleccionada = tabla;
  }

  get usuariosBuscados() {
    return this._usuariosBuscados;
  }

  get tablaSeleccionada() {
    return this._tablaSeleccionada;
  }
}

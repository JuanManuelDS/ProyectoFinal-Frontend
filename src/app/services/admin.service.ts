import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Paginacion, Content, Rol } from '../models/paginacion.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _tablaSeleccionada: string = 'users';
  private _usuarios: Content[] = [];
  private _usuariosBuscados: Content[] = [];
  private _pageIndex: number = 0;
  public nRegistros: number = 20;

  constructor(private http: HttpClient) {}

  cargarUsuarios() {
    const url =
      'https://proyectofinal-backend-production.up.railway.app/api/usuarios';
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token ? token : '');
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pagina', this._pageIndex);
    queryParams = queryParams.append('registros', this.nRegistros);
    return this.http
      .get<Paginacion>(url, { headers, params: queryParams })
      .pipe(
        tap((resp) => {
          this._usuarios = resp.content;
          this._usuariosBuscados = resp.content;
        })
      );
  }

  cargarUsuario(nombreUsuario: string) {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token ? token : '');
    const url = `https://proyectofinal-backend-production.up.railway.app/api/usuarios/buscar/nombre_usuario/${nombreUsuario}`;

    return this.http.get<Content>(url, { headers });
  }

  cargarUsuarioBuscado(termino: string) {
    const usuarios = this._usuarios.filter((user) =>
      user.nombreUsuario.toLowerCase().includes(termino.toLowerCase())
    );
    this._usuariosBuscados = usuarios;
  }

  eliminarUsuario(nombreUsuario: string) {
    const url = `https://proyectofinal-backend-production.up.railway.app/api/usuarios/${nombreUsuario}`;
    return this.http.delete(url);
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

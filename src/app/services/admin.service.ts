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
  private _paginas: number = 0;

  constructor(private http: HttpClient) {}

  cargarUsuarios() {
    const url =
      'https://proyectofinal-backend-production-8cff.up.railway.app/api/usuarios';
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token ? token : '');
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pagina', this._pageIndex);
    queryParams = queryParams.append('registros', this.nRegistros);
    return this.http
      .get<Paginacion>(url, { headers, params: queryParams })
      .pipe(
        tap((resp) => {
          console.log('me ejecuto');
          this._usuarios = resp.content;
          this._usuariosBuscados = resp.content;
          this._paginas = resp.totalPages;
        })
      );
  }

  cargarUsuario(nombreUsuario: string) {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token ? token : '');
    const url = `https://proyectofinal-backend-production-8cff.up.railway.app/api/usuarios/buscar/nombre_usuario/${nombreUsuario}`;

    return this.http.get<Content>(url, { headers });
  }

  cargarUsuarioBuscado(termino: string) {
    const usuarios = this._usuarios.filter((user) =>
      user.nombreUsuario.toLowerCase().includes(termino.toLowerCase())
    );
    this._usuariosBuscados = usuarios;
  }

  eliminarUsuario(nombreUsuario: string) {
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token ? token : '');
    const url = `https://proyectofinal-backend-production-8cff.up.railway.app/api/usuarios/${nombreUsuario}`;
    return this.http.delete(url, { headers });
  }

  editarRol(username: string, roleName: string) {
    const url =
      'https://proyectofinal-backend-production-8cff.up.railway.app/api/roles/usuarios';
    const body = { username, roleName };
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token ? token : '');

    return this.http.post(url, body, { headers });
  }

  siguientePagina() {
    this._pageIndex++;
    return this.cargarUsuarios();
  }

  paginaAnterior() {
    this._pageIndex--;
    return this.cargarUsuarios();
  }

  cambiarTabla(tabla: string) {
    this._tablaSeleccionada = tabla;
  }

  resetearIndexPagina() {
    this._pageIndex = 0;
  }

  get paginas() {
    return this._paginas;
  }

  get usuariosBuscados() {
    return this._usuariosBuscados;
  }

  get tablaSeleccionada() {
    return this._tablaSeleccionada;
  }

  get pageIndex() {
    return this._pageIndex;
  }
}

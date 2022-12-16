import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { AuthResponse, Usuario } from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Usuario;

  constructor(private http: HttpClient) {}

  login(nombreUsuario: string, password: string) {
    const url = 'https://proyectofinal-backend-production.up.railway.app/login';
    const body = { nombreUsuario, contrasena: password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        //Si obtengo un token como respuesta es que el login ha sido exitoso
        if (resp.token) {
          //Guardo el token en el localStorage
          localStorage.setItem('token', resp.token);
          //Seteo el usuario con los datos correctos
          this._usuario = { ...body };
        }
      }),
      map((resp) => resp),
      catchError((err) => {
        console.log('ha ocurrido un error antes del subscribe de login()');
        return of(err);
      })
    );
  }
}

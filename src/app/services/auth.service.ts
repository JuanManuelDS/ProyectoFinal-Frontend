import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import {
  AuthResponse,
  NuevoUsuario,
  TokenValidation,
  Usuario,
} from '../models/auth.interface';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Usuario;
  private _isAdmin: boolean = false;
  private _isLogged: boolean = false;
  public emailRegex: string =
    '^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]{2,}\\.[a-z]{2,4}$';

  constructor(private http: HttpClient) {}

  login(nombreUsuario: string, password: string) {
    const url =
      'https://proyectofinal-backend-production-8cff.up.railway.app/login';
    const body = { nombreUsuario, contrasena: password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        //Si obtengo un token como respuesta es que el login ha sido exitoso
        if (resp.token) {
          //Guardo el token en el localStorage
          localStorage.setItem('token', resp.token);
          localStorage.setItem('nombreUsuario', nombreUsuario);
          //Seteo el usuario con los datos correctos
          this._usuario = { ...body };
          this._isLogged = true;
        }
      }),
      map((resp) => resp),
      catchError((err) => {
        console.log(
          'ha ocurrido un error antes del subscribe de login() ' +
            JSON.stringify(err)
        );
        return of(err);
      })
    );
  }

  register(usuario: NuevoUsuario) {
    const url =
      'https://proyectofinal-backend-production-8cff.up.railway.app/api/register';
    return this.http.post(url, usuario).pipe(
      map((resp) => true),
      catchError((err) => of(err))
    );
  }

  logout() {
    //Elimino los datos del localStorage relacionados con la autentificación así deberá volver a loguearse
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    this._isLogged = false;
  }

  camposIguales(campo1: string, campo2: string) {
    //En realidad lo que sucede es que recibimos todo el FormGroup por parámetros
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        //Seteo el error del password2 para que aparezca el mensaje "las contraseñas deben coincidir"
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return {
          noIguales: true,
        };
      } else {
        //En caso que sean iguales debo setear a null los errores así desaparece el mensaje de advertencia
        formGroup.get(campo2)?.setErrors(null);
        return null;
      }
    };
  }

  validarToken() {
    const url =
      'https://proyectofinal-backend-production-8cff.up.railway.app/api/token/validar';

    //Tomo el token del local storage (en caso que lo tenga)
    const token = 'Bearer ' + localStorage.getItem('token');

    //En caso que no tenga un token en el localstorage paso un string vacío
    const headers = new HttpHeaders().set('Authorization', token || '');

    return this.http.get<TokenValidation>(url, { headers }).pipe(
      tap((resp) => {
        //Si los roles incluidos en el token incluye ROLE_ADMIN entonces seteo al usuario como admin
        if (resp.roles?.includes('ADMIN')) {
          this._isAdmin = true;
        } else this._isAdmin = false;
        //seteo el estado isLogged a true
        this._isLogged = true;
      })
    );
  }

  esAdmin() {
    this._isAdmin = true;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get isLogged() {
    return this._isLogged;
  }

  get usuario() {
    return this._usuario;
  }
}

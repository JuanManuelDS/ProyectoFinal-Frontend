import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { AuthResponse, Usuario } from '../models/auth.interface';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Usuario;
  public emailRegex: string =
    '^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]{2,}\\.[a-z]{2,4}$';

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
        console.log(
          'ha ocurrido un error antes del subscribe de login() ' +
            JSON.stringify(err)
        );
        return of(err);
      })
    );
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

  validarLogin(nombreUsuario: string, contrasena: string) {}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidatorsService implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const nombreUsuario = control.value;
    const url = `https://proyectofinal-backend-production.up.railway.app/api/usuarios/username_tomado/${nombreUsuario}`;
    return this.http.get<any[]>(url).pipe(
      //Si devuelvo null implica que el usuario no fue tomado
      map((resp) => {
        return resp.length === 0 ? null : { usernameTomado: true };
      })
    );
  }
  /* registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  } */
}

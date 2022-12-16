import { HttpClient, HttpParams } from '@angular/common/http';
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
export class EmailValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const email = control.value;
    const url = `https://proyectofinal-backend-production.up.railway.app/api/validacion/email_tomado/${email}`;
    return this.http.get<any>(url).pipe(
      //Si devuelvo null implica que el usuario no fue tomado
      map((resp) => {
        return resp === false ? null : { emailTomado: true };
      })
    );
  }
}

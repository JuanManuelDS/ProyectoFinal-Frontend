import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsyncValidatorsService implements AsyncValidator {
  constructor(private http: HttpClient) { }
  
  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    const nombreUsuario = control.value;
    const url = `https://proyectofinal-backend-production.up.railway.app/api/usuarios/username_tomado/${nombreUsuario}`
    return this.http.get<any[]>(url)
  }
  /* registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  } */
}

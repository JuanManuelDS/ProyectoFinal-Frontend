import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { TokenValidation } from '../models/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validarToken().pipe(
      //esto se lee antes de enviar la respuesta, lo hago para redireccionar al login en caso que validarToken retorne false
      tap((resp) => {
        console.log('respuesta de validacion token: ' + JSON.stringify(resp));
        if (!resp.username) {
          this.router.navigateByUrl('/auth');
        }
      }),
      map((resp) => true),
      catchError((err) => {
        this.router.navigateByUrl('/auth');
        return of(err);
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken().pipe(
      //esto se lee antes de enviar la respuesta, lo hago para redireccionar al login en caso que validarToken retorne false
      tap((resp) => {
        console.log('respuesta de validacion token: ' + JSON.stringify(resp));
        if (!resp.username) {
          this.router.navigateByUrl('/auth');
        }
      }),
      map((resp) => true),
      catchError((err) => {
        this.router.navigateByUrl('/auth');
        return of(err);
      })
    );
  }

  /* canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  } */
}

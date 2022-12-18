import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
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
        if (resp.roles?.includes('ROLE_ADMIN')) {
          //En caso que tenga el rol de admin lo seteo como tal
          this.authService.esAdmin();
        }
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
}

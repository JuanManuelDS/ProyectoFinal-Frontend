import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { catchError, map, Observable, tap, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarAdminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validarToken().pipe(
      //esto se lee antes de enviar la respuesta, lo hago para redireccionar al login en caso que validarToken retorne false
      tap((resp) => {
        if (!resp.roles?.includes('ADMIN')) {
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
        if (!resp.roles?.includes('ADMIN')) {
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

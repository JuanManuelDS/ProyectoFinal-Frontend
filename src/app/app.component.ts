import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ProyectoFinal-Frontend';
  notLoginRegister: boolean = true;

  
  constructor(private authService: AuthService, private router: Router) {
    //Obtengo la ruta actual y, si esta no es login o register, entonces seteo el notLoginRegister a true
    //y muestro al navbar
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/register' || event.url === '/login') {
          this.notLoginRegister = false;
        } else this.notLoginRegister = true;
      }
    });
  }

  ngOnInit() {
    //Valido el token ni bien carga la página para actualizar el isLogged y así mostrar un navbar u otro
    this.authService.validarToken().subscribe();
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

  get isLogged() {
    return this.authService.isLogged;
  }
}

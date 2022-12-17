import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-loginRegister',
  templateUrl: './loginRegister.component.html',
  styleUrls: ['./loginRegister.component.css'],
})
export class LoginRegisterComponent {
  titulo: string = '';
  currentRoute: string = '';

  constructor(private router: Router) {
    //Me fijo en qué ruta está
    this.currentRoute = this.router.url;

    //ASigno el nombre del título según la ruta en que se encuentra el usuario
    if (this.router.url === '/login') {
      this.titulo = 'Login';
    } else this.titulo = 'Register';
  }
}

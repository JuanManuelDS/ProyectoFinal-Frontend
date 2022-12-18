import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbarLogueado',
  templateUrl: './navbarLogueado.component.html',
  styleUrls: ['./navbarLogueado.component.css'],
})
export class NavbarLogueadoComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  nombreUsuario: string | null = '';

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }
}

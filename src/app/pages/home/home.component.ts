import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.validarToken().subscribe();
  }

  getStarted() {
    if (this.isLogged) {
      this.router.navigateByUrl('/dashboard');
    } else this.router.navigateByUrl('/register');
  }

  get isLogged() {
    return this.authService.isLogged;
  }
}

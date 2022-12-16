import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../loginRegister.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    nombreUsuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
  });

  loginInvalido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    const { nombreUsuario, contrasena } = this.loginForm.value;
    console.log(nombreUsuario, contrasena);
    this.authService.login(nombreUsuario, contrasena).subscribe((resp) => {
      if (resp.token) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.loginInvalido = true;
      }
    });
  }

}

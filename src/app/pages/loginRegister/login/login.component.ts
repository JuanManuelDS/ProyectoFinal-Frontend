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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    const { nombreUSuario, password } = this.loginForm.value;
    this.authService.login(nombreUSuario, password).subscribe(resp => {
      if (resp.token) {
        this.router.navigateByUrl('/dashboard');
      } else {

      }
    })
  }
}

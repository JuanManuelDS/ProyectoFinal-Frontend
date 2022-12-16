import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EmailValidatorService } from 'src/app/services/email-validator.service';
import { UsernameValidatorService } from 'src/app/services/username-validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../loginRegister.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group(
    {
      nombreUsuario: [
        '',
        [Validators.required, Validators.minLength(4)],
        //Valido que el nobre de usuario no esté en uso
        [this.usernameValidator],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.authService.emailRegex)],
        //Valido que el email tampoco esté en uso
        [this.emailValidator],
      ],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      contrasena2: ['', Validators.required],
    },
    {
      //Validamos que las contraseñas sean iguales
      validators: [this.authService.camposIguales('contrasena', 'contrasena2')],
    }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private emailValidator: EmailValidatorService,
    private usernameValidator: UsernameValidatorService,
    private router: Router
  ) {}

  register() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const { nombreUsuario, contrasena, email } = this.registerForm.value;
      const usuario: NuevoUsuario = { nombreUsuario, contrasena, email };
      let exito = this.authService.register(usuario).subscribe();
      if (exito) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado correctamente',
          text: 'Logueate para finalizar el proceso de registro',
          confirmButtonText: 'Login',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/login');
          }
        });
      }
    }
  }

  campoInvalido(campo: string) {
    return (
      this.registerForm.get(campo)?.invalid &&
      this.registerForm.get(campo)?.touched
    );
  }

  /*------------- MENSAJES DE ERROR DE LOS INPUTS -----------------------*/

  get emailErrors() {
    const errors = this.registerForm.get('email')?.errors;
    if (errors?.['required']) {
      return 'Este campo es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El formato no corresponde a un email';
    } else if (errors?.['emailTomado']) {
      return 'Ya existe una cuenta con ese email';
    } else return '';
  }

  get usernameErrors() {
    const errors = this.registerForm.get('nombreUsuario')?.errors;
    console.log(errors);
    if (errors?.['required']) {
      return 'Este campo es obligatorio';
    } else if (errors?.['usernameTomado']) {
      return 'Este nombre de usuario ya existes';
    } else if (errors?.['minlength']) {
      return 'Debe tener como mínimo 4 caracteres';
    } else return '';
  }

  get contrasenaErrors() {
    const errors = this.registerForm.get('contrasena')?.errors;
    if (errors?.['required']) {
      return 'Este campo es obligatorio';
    } else if (errors?.['minlength']) {
      return 'Debe tener como mínimo 6 caracteres';
    } else return '';
  }

  get contrasena2Errors() {
    const errors = this.registerForm.get('contrasena2')?.errors;
    if (errors?.['required']) {
      return 'Este campo es obligatorio';
    } else if (errors?.['noIguales']) {
      return 'Las contraseñas deben coincidir';
    } else return '';
  }
}

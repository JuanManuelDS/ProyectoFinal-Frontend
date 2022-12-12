import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Datos } from 'src/app/models/curriculum.interface';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-formulario-curriculum',
  templateUrl: './formulario-curriculum.component.html',
  styleUrls: ['./formulario-curriculum.component.css'],
})
export class FormularioCurriculumComponent {
  datosForm: FormGroup = this.formBuilder.group({
    nombre: [''],
    ciudad: [''],
    nacimiento: [''],
    telefono: [''],
    email: [''],
    presentacion: [''],
  });

  experienciaForm: FormGroup = this.formBuilder.group({
    experiencias: this.formBuilder.array([]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private cvService: CurriculumService
  ) {}

  guardarDatos() {
    let datos: Datos = {
      nombre: this.datosForm.get('nombre')?.value,
      ciudad: this.datosForm.get('ciudad')?.value,
      nacimiento: this.datosForm.get('nacimiento')?.value,
      telefono: this.datosForm.get('telefono')?.value,
      email: this.datosForm.get('email')?.value,
      presentacion: this.datosForm.get('presentacion')?.value,
    };
    this.cvService.agregarDatos(datos);
  }
}

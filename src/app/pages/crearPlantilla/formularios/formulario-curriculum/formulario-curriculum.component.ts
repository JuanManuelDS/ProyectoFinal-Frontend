import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  Datos,
  Estudio,
  Experiencia,
} from 'src/app/models/curriculum.interface';
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

  nuevaExperienciaForm: FormGroup = this.formBuilder.group({
    empresa: [''],
    localidad: [''],
    descripcion: [''],
    inicio: [''],
    fin: [''],
  });

  nuevosEstudiosForm: FormGroup = this.formBuilder.group({
    year: [''],
    titulo: [''],
    establecimiento: [''],
    descripcion: [''],
  });

  estudiosForms: FormGroup = this.formBuilder.group({
    estudios: this.formBuilder.array([]),
  });

  experienciasForms: FormGroup = this.formBuilder.group({
    experiencias: this.formBuilder.array([]),
  });

  get arrExperiencias() {
    return this.experienciasForms.controls['experiencias'] as FormArray;
  }

  get arrEstudios() {
    return this.estudiosForms.controls['estudios'] as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private cvService: CurriculumService
  ) {}

  guardarDatos() {
    //Paso los datos del formulario a un objeto y se lo envío al servicio para que lo agregue al documento
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

  guardarEstudios() {
    let estudio: Estudio = {
      year: this.nuevosEstudiosForm.get('year')?.value,
      establecimiento: this.nuevosEstudiosForm.get('establecimiento')?.value,
      titulo: this.nuevosEstudiosForm.get('titulo')?.value,
      descripcion: this.nuevosEstudiosForm.get('descripcion')?.value,
    };

    this.cvService.agregarEstudio(estudio);

    this.arrEstudios.push(
      this.formBuilder.group({
        year: [estudio.year],
        establecimiento: [estudio.establecimiento],
        titulo: [estudio.titulo],
        descripcion: [estudio.descripcion],
      })
    );

    this.nuevosEstudiosForm.reset();
  }

  guardarExperiencia() {
    //Creo un objeto de tipo Experiencia y se lo paso al service para que lo agregue al documento
    let experiencia: Experiencia = {
      empresa: this.nuevaExperienciaForm.get('empresa')?.value,
      localidad: this.nuevaExperienciaForm.get('localidad')?.value,
      descripcion: this.nuevaExperienciaForm.get('descripcion')?.value,
      inicio: this.nuevaExperienciaForm.get('inicio')?.value,
      fin: this.nuevaExperienciaForm.get('fin')?.value,
    };
    this.cvService.agregarExperiencia(experiencia);

    //Creo y envío un nuevo form group con la información del objeto enviado y lo
    //agrego al formArray en experiencias
    this.arrExperiencias.push(
      this.formBuilder.group({
        empresa: [experiencia.empresa],
        localidad: [experiencia.localidad],
        descripcion: [experiencia.descripcion],
        inicio: [experiencia.inicio],
        fin: [experiencia.fin],
      })
    );

    //reseteo los valores del formulario para agregar una nueva experiencia
    this.nuevaExperienciaForm.reset();
  }

  eliminarExperiencia(index: number) {
    //Lo elimino del arrayForm de experiencias
    this.arrExperiencias.removeAt(index);

    //Lo elimino del array de experiencias que se encuentra en el servicio
    this.cvService.eliminarExperiencia(index);
  }

  eliminarEstudios(index: number) {
    this.arrEstudios.removeAt(index);

    this.cvService.eliminarEstudio(index);
  }
}

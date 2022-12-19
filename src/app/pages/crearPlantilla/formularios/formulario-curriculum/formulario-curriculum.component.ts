import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  Conocimiento,
  Datos,
  DatosInteres,
  Estudio,
  Experiencia,
  Idioma,
} from 'src/app/models/curriculum.interface';
import { CurriculumService } from 'src/app/services/curriculum.service';
import convertBase64 from 'src/app/utils/convertBase64';

@Component({
  selector: 'app-formulario-curriculum',
  templateUrl: './formulario-curriculum.component.html',
  styleUrls: ['./formulario-curriculum.component.css'],
})
export class FormularioCurriculumComponent {
  abajo: boolean = true;
  imagen: any;

  @Output() crearPDF = new EventEmitter();

  datosForm: FormGroup = this.formBuilder.group({
    nombre: [''],
    ciudad: [''],
    nacimiento: [''],
    telefono: [''],
    email: [''],
    imagen: [],
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

  nuevoConocimientoForm: FormGroup = this.formBuilder.group({
    conocimiento: [''],
  });

  datoInteresForm: FormGroup = this.formBuilder.group({
    dato: [''],
  });

  nuevoIdiomaForm: FormGroup = this.formBuilder.group({
    idioma: [''],
    escrito: [''],
    oral: [''],
  });

  conocimientosForms: FormGroup = this.formBuilder.group({
    conocimientos: this.formBuilder.array([]),
  });

  estudiosForms: FormGroup = this.formBuilder.group({
    estudios: this.formBuilder.array([]),
  });

  experienciasForms: FormGroup = this.formBuilder.group({
    experiencias: this.formBuilder.array([]),
  });

  idiomasForms: FormGroup = this.formBuilder.group({
    idiomas: this.formBuilder.array([]),
  });

  datosInteresForms: FormGroup = this.formBuilder.group({
    datosInteres: this.formBuilder.array([]),
  });

  get arrExperiencias() {
    return this.experienciasForms.controls['experiencias'] as FormArray;
  }

  get arrEstudios() {
    return this.estudiosForms.controls['estudios'] as FormArray;
  }

  get arrConocimientos() {
    return this.conocimientosForms.controls['conocimientos'] as FormArray;
  }

  get arrIdiomas() {
    return this.idiomasForms.controls['idiomas'] as FormArray;
  }

  get arrDatosInteres() {
    return this.datosInteresForms.controls['datosInteres'] as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private cvService: CurriculumService
  ) {}

  generarPDF() {
    this.crearPDF.emit(true);
  }

  /* guardarInfo(){} */

  guardarDatos() {
    //Paso los datos del formulario a un objeto y se lo envío al servicio para que lo agregue al documento
    let { ...datos } = this.datosForm.value;
    this.cvService.agregarDatos(datos);
  }

  guardarConocimiento() {
    let { ...conocimiento }: Conocimiento = this.nuevoConocimientoForm.value;
    this.cvService.agregarConocimiento(conocimiento);

    this.arrConocimientos.push(
      this.formBuilder.group({
        ...conocimiento,
      })
    );

    this.nuevoConocimientoForm.reset();
  }

  guardarDatoInteres() {
    let { ...datoInteres }: DatosInteres = this.datoInteresForm.value;

    this.cvService.agregarDatoInteres(datoInteres);

    this.arrDatosInteres.push(
      this.formBuilder.group({
        ...datoInteres,
      })
    );

    this.datoInteresForm.reset();
  }

  guardarIdioma() {
    let { ...idioma }: Idioma = this.nuevoIdiomaForm.value;
    this.cvService.agregarIdioma(idioma);

    this.arrIdiomas.push(this.formBuilder.group({ ...idioma }));

    this.nuevoIdiomaForm.reset();
  }

  guardarEstudios() {
    let { ...estudio } = this.nuevosEstudiosForm.value;

    this.cvService.agregarEstudio(estudio);

    this.arrEstudios.push(
      this.formBuilder.group({
        ...estudio,
      })
    );

    this.nuevosEstudiosForm.reset();
  }

  guardarExperiencia() {
    //Creo un objeto de tipo Experiencia y se lo paso al service para que lo agregue al documento
    let { ...experiencia }: Experiencia = this.nuevaExperienciaForm.value;
    this.cvService.agregarExperiencia(experiencia);

    //Creo y envío un nuevo form group con la información del objeto enviado y lo
    //agrego al formArray en experiencias
    this.arrExperiencias.push(
      this.formBuilder.group({
        ...experiencia,
      })
    );

    //reseteo los valores del formulario para agregar una nueva experiencia
    this.nuevaExperienciaForm.reset();
  }

  /* eliminarFormulario(arrForm: FormArray, index: number) {
    this.cvService.eliminarInfo(arrForm, index);
    arrForm.removeAt(index);
  } */

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

  eliminarConocimiento(index: number) {
    this.arrConocimientos.removeAt(index);
    this.cvService.eliminarConocimiento(index);
  }

  eliminarIdioma(index: number) {
    this.arrIdiomas.removeAt(index);
    this.cvService.eliminarIdioma(index);
  }

  eliminarDatoInteres(index: number) {
    this.arrDatosInteres.removeAt(index);
    this.cvService.eliminarDatoInteres(index);
  }

  async cargarImagen(event: any) {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    this.imagen = base64;
  }

  limpiar(formulario: string) {
    switch (formulario) {
      case 'datos':
        this.datosForm.reset();
        this.cvService.limpiarDatos();
        break;
      case 'experiencias':
        this.nuevaExperienciaForm.reset();
        break;
      case 'idiomas':
        this.nuevoIdiomaForm.reset();
        break;
      case 'datosInteres':
        this.datoInteresForm.reset();
        break;
      case 'estudios':
        this.nuevosEstudiosForm.reset();
        break;
    }
  }

  cambiarIcono() {
    if (this.abajo) {
      this.abajo = false;
    } else this.abajo = true;
  }
}

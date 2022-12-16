import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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


  guardarDatos() {
    //Paso los datos del formulario a un objeto y se lo envío al servicio para que lo agregue al documento
    let datos: Datos = {
      nombre: this.datosForm.get('nombre')?.value,
      ciudad: this.datosForm.get('ciudad')?.value,
      nacimiento: this.datosForm.get('nacimiento')?.value,
      telefono: this.datosForm.get('telefono')?.value,
      email: this.datosForm.get('email')?.value,
      presentacion: this.datosForm.get('presentacion')?.value,
      imagen: this.imagen,
    };
    let img = this.datosForm.get('imagen')?.value;
    console.log(img);
    this.cvService.agregarDatos(datos);
  }

  guardarConocimiento() {
    let conocimiento: Conocimiento = {
      conocimiento: this.nuevoConocimientoForm.get('conocimiento')?.value,
    };
    this.cvService.agregarConocimiento(conocimiento);

    this.arrConocimientos.push(
      this.formBuilder.group({
        conocimiento: [conocimiento.conocimiento],
      })
    );

    this.nuevoConocimientoForm.reset();
  }

  guardarDatoInteres() {
    let datoInteres: DatosInteres = {
      dato: this.datoInteresForm.get('dato')?.value,
    };

    this.cvService.agregarDatoInteres(datoInteres);

    this.arrDatosInteres.push(
      this.formBuilder.group({
        dato: [datoInteres.dato],
      })
    );

    this.datoInteresForm.reset();
  }

  guardarIdioma() {
    let idioma: Idioma = {
      idioma: this.nuevoIdiomaForm.get('idioma')?.value,
      escrito: this.nuevoIdiomaForm.get('escrito')?.value,
      oral: this.nuevoIdiomaForm.get('oral')?.value,
    };
    this.cvService.agregarIdioma(idioma);

    this.arrIdiomas.push(
      this.formBuilder.group({
        idioma: [idioma.idioma],
        escrito: [idioma.escrito],
        oral: [idioma.oral],
      })
    );

    this.nuevoIdiomaForm.reset();
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

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Conocimiento,
  Curriculum,
  DatosInteres,
  Experiencia,
  Idioma,
} from 'src/app/models/curriculum.interface';
import { Plantilla } from 'src/app/models/plantillas.interface';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { PlantillasService } from 'src/app/services/plantillas.service';
import convertBase64 from 'src/app/utils/convertBase64';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-curriculum',
  templateUrl: './formulario-curriculum.component.html',
  styleUrls: ['./formulario-curriculum.component.css'],
})
export class FormularioCurriculumComponent implements OnInit, OnDestroy {
  abajo: boolean = true;
  imagen: any;
  plantilla: Plantilla | undefined;
  nombreArchivo: string | undefined = '';
  idPlantilla: number | undefined;

  @Output() crearPDF = new EventEmitter();

  /* --------- FORMULARIOS PARA AGREGAR NUEVOS DATOS -------------------*/
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

  nuevoIdiomaForm: FormGroup = this.formBuilder.group({
    idioma: [''],
    escrito: [''],
    oral: [''],
  });

  /* ----------- ARRAYS DE FORMULARIOS ----------------------*/
  datoInteresForm: FormGroup = this.formBuilder.group({
    dato: [''],
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

  constructor(
    private formBuilder: FormBuilder,
    private cvService: CurriculumService,
    private activatedRoute: ActivatedRoute,
    private plantillaService: PlantillasService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.cvService.resetearDatos();
  }

  //Al cargarse el componente me fijo si la ruta tiene un id, lo que indica que debo cargar una plantilla existente
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      this.idPlantilla = Number(id);
      this.plantillaService.getPlantilla(this.idPlantilla).subscribe(
        (resp) => {
          this.plantilla = resp;
          this.nombreArchivo = resp.nombreArchivo;
          this.rellenarDatos();
        },
        (err) => {
          this.router.navigateByUrl('/dashboard');
        }
      );
    }
  }

  /* - RELLENA TANTO EL FORMULARIO COMO EL NOMBRE DEL ARCHIVO Y LA PLANTILLA (EL DOCUMENTO) ------------ */
  rellenarDatos() {
    let data: Curriculum = JSON.parse(this.plantilla!.datos);
    this.cvService.resetearDatos();
    this.nombreArchivo = this.plantilla?.nombreArchivo;
    if (data.datos !== null && data.datos !== undefined) {
      const { nombre, ciudad, nacimiento, email, telefono, presentacion } =
        data.datos;
      this.datosForm.setValue({
        nombre,
        ciudad,
        nacimiento,
        email,
        telefono,
        presentacion,
        imagen: '',
      });
      this.imagen = data.datos.imagen;
      this.guardarDatos();
    }
    if (data.experiencias !== null && data.experiencias !== undefined) {
      for (let i = 0; i < data.experiencias.length; i++) {
        this.arrExperiencias.push(
          this.formBuilder.group({ ...data.experiencias[i] })
        );
        this.cvService.agregarExperiencia(data.experiencias[i]);
      }
    }
    if (data.conocimientos !== null && data.conocimientos !== undefined) {
      for (let i = 0; i < data.conocimientos.length; i++) {
        this.arrConocimientos.push(
          this.formBuilder.group({ ...data.conocimientos[i] })
        );
        this.cvService.agregarConocimiento(data.conocimientos[i]);
      }
    }
    if (data.estudios !== null && data.estudios !== undefined) {
      for (let i = 0; i < data.estudios.length; i++) {
        this.arrEstudios.push(this.formBuilder.group({ ...data.estudios[i] }));
        this.cvService.agregarEstudio(data.estudios[i]);
      }
    }

    if (data.idiomas !== null && data.idiomas !== undefined) {
      for (let i = 0; i < data.idiomas.length; i++) {
        this.arrIdiomas.push(this.formBuilder.group({ ...data.idiomas[i] }));
        this.cvService.agregarIdioma(data.idiomas[i]);
      }
    }
    if (data.datosInteres !== null && data.datosInteres !== undefined) {
      for (let i = 0; i < data.datosInteres.length; i++) {
        this.arrDatosInteres.push(
          this.formBuilder.group({ ...data.datosInteres[i] })
        );
        this.cvService.agregarDatoInteres(data.datosInteres[i]);
      }
    }
  }

  /*-------------- GETTERS DE LOS ARRAYS DE FORMULARIOS --------------------------*/

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

  //Pido el nombre del archivo en caso de no tenerlo y llamo al método de cvService que guarda la plantilla en la
  //base de datos
  async guardarCV() {
    if (this.nombreArchivo === '') {
      const { value } = await Swal.fire({
        title: 'Nombre del archivo',
        input: 'text',
        inputValue: '',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve: any) => {
            if (value === '') {
              resolve('Por favor, ingresa un nombre de archivo');
            } else resolve();
          });
        },
      });
      this.nombreArchivo = value;
    }
    //Me fijo que efectivamente tenga un nombre el archivo
    if (
      this.nombreArchivo!.length > 0 &&
      (this.idPlantilla === undefined || this.idPlantilla === null)
    ) {
      this.cvService.guardarCv(this.nombreArchivo!);
    } else if (
      this.nombreArchivo!.length > 0 &&
      (this.idPlantilla !== undefined || this.idPlantilla !== null)
    ) {
      this.cvService.actualizarCv(this.idPlantilla!, this.nombreArchivo!);
    }
  }

  //Método que dispara el generador de pdf en plantilla/curriculum
  generarPDF() {
    this.guardarCV();
    this.crearPDF.emit(true);

    //this.router.navigateByUrl('/dashboard');
  }

  /*---------------- MÉTODOS PARA GUARDAR DATOS ------------------------*/

  guardarDatos() {
    //Paso los datos del formulario a un objeto y se lo envío al servicio para que lo agregue al documento
    let { ...datos } = this.datosForm.value;
    datos.imagen = this.imagen;
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

  /*----------------- MÉTODOS PARA ELIMINAR DATOS --------------------------*/

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

  /* CONVERSOR DE IMAGENES A BASE64 */
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

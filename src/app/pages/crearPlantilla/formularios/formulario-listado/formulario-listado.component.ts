import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, Listado } from 'src/app/models/listado.interface';
import { Plantilla } from 'src/app/models/plantillas.interface';
import { ListadoService } from 'src/app/services/listado.service';
import { PlantillasService } from 'src/app/services/plantillas.service';
import convertBase64 from 'src/app/utils/convertBase64';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-listado',
  templateUrl: './formulario-listado.component.html',
  styleUrls: ['./formulario-listado.component.css'],
})
export class FormularioListadoComponent implements OnInit, OnDestroy {
  imagen: any;
  plantilla: Plantilla | undefined;
  nombreArchivo: string | undefined = '';
  idActual: any;

  // NUEVOS
  nuevoListado: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    imagen: [],
    items: this.fb.array([]),
  });

  nuevoItem: FormGroup = this.fb.group({
    unidades: [0],
    item: [''],
    precio: [0],
  });

  // TODOS
  listado: FormGroup = this.fb.group({
    listado: this.fb.array([]),
  });

  // GETTERS
  get arrListado() {
    return this.listado.controls['listado'] as FormArray;
  }

  get arrItems() {
    return this.nuevoListado.controls['items'] as FormArray;
  }

  @Output() crearPDF = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private lisService: ListadoService,
    private plantillaService: PlantillasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.lisService.resetearListado();
  }

  ngOnInit(): void {
    this.idActual = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.idActual !== null && this.idActual !== undefined) {
      this.plantillaService
        .getPlantilla(Number(this.idActual))
        .subscribe((resp) => {
          this.plantilla = resp;
          this.rellenarDatos();
        });
    }
  }

  rellenarDatos() {
    let data: Listado = JSON.parse(this.plantilla!.datos);
    this.lisService.resetearListado();
    this.nombreArchivo = this.plantilla?.nombreArchivo;

    if (data.titulo !== null && data.titulo !== undefined) {
      this.nuevoListado.controls['titulo'].setValue(data.titulo);
      this.lisService.cambiarTitulo(data.titulo);
    }

    if(data.items !== null && data.items !== undefined) {
      for(let i = 0; i < data.items.length; i++) {
        let it = this.arrItems;
        it.push(this.fb.group({ ...data.items[i] }));
        this.lisService.guardarItem(data.items[i]);
      }
    }
    if (data.imagen !== null && data.imagen !== undefined) {
      this.lisService.cargarImagen(data.imagen);
    }
  }

  cambiarTitulo() {
    let titulo = this.nuevoListado.get('titulo')?.value;
    this.lisService.cambiarTitulo(titulo);
  }

  guardarItem() {
    let item: Item = {
      unidades: this.nuevoItem.get('unidades')?.value,
      item: this.nuevoItem.get('item')?.value,
      precio: this.nuevoItem.get('precio')?.value,
    };
    this.lisService.guardarItem(item);

    let list = this.nuevoListado.get('items') as FormArray;
    list.push(
      this.fb.group({
        unidades: [item.unidades],
        item: [item.item],
        precio: [item.precio],
      })
    );

    this.guardarListado();
    this.nuevoItem.reset();
  }

  guardarListado() {
    let listado: Listado = {
      titulo: this.nuevoListado.get('titulo')?.value,
      imagen: this.imagen,
      items: this.nuevoListado.get('items')?.value,
    };

    this.arrListado.push(
      this.fb.group({
        titulo: [listado.titulo],
        imagen: [listado.imagen],
        items: [listado.items],
      })
    );
  }

  eliminarItem(index: number) {
    let item = this.nuevoListado.get('items') as FormArray;
    item.removeAt(index);
    this.lisService.eliminarItem(index);
  }

  async cargarImagen(event: any) {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    this.imagen = base64;
    this.lisService.cargarImagen(this.imagen);
  }

  async guardarArchivo() {
    console.log(this.idActual);
    if (this.idActual === null || this.idActual === undefined) {
      console.log('NA ' + this.nombreArchivo);
      if (this.nombreArchivo === '') {
        const { value: nombre_archivo } = await Swal.fire({
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
        this.lisService.nombreArchivo = nombre_archivo;
        this.lisService.guardarListado();
      }
    } else {
      console.log('1');
      this.lisService.nombreArchivo = String(this.nombreArchivo);
      this.lisService.actualizarListado(Number(this.idActual));
    }
  }

  generarPDF() {
    this.guardarArchivo();
    this.crearPDF.emit(true);
  }
}

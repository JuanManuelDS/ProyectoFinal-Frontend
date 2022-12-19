import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
export class FormularioListadoComponent implements OnInit {
  nombreArchivo: string = '';

  listadoData: Listado | undefined;
  plantilla: Plantilla | undefined;
  @Output() crearPDF = new EventEmitter();

  nuevoItem: FormGroup = this.fb.group({
    titulo: [''],
    item: [''],
    imagen: [''],
  });

  listado: FormGroup = this.fb.group({
    listado: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private lisService: ListadoService,
    private activatedRoute: ActivatedRoute,
    private plantillaService: PlantillasService
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      this.plantillaService.getPlantilla(Number(id)).subscribe((resp) => {
        this.plantilla = resp;
        this.rellenarDatos();
      });
    }
  }

  rellenarDatos() {
    let data: Listado = JSON.parse(this.plantilla!.datos);
    this.nuevoItem.get('titulo')?.setValue(data.titulo);
    this.lisService.cambiarTitulo(data.titulo);
    for (let i = 0; i < data.items.length; i++) {
      this.arrListado.push(this.fb.group({ ...data.items[i] }));
      this.lisService.guardarItem(data.items[i]);
    }
  }

  get arrListado() {
    return this.listado.controls['listado'] as FormArray;
  }

  cambiarTitulo() {
    let titulo = this.nuevoItem.get('titulo')?.value;
    this.lisService.cambiarTitulo(titulo);
  }

  guardarItem() {
    let item: Item = {
      item: this.nuevoItem.get('item')?.value,
    };
    this.lisService.guardarItem(item);

    this.arrListado.push(
      this.fb.group({
        item: [item.item],
      })
    );

    this.nuevoItem.get('item')?.reset();
  }

  async cargarImagen(event: any) {
    console.log('me ejecuto');
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    this.lisService.cargarImagen(base64);
  }

  async generarPDF() {
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
      this.lisService.nombreArchivo(nombre_archivo);
      this.lisService.guardarListado();
      this.crearPDF.emit(true);
    }
  }

  eliminarItem(index: number) {
    this.arrListado.removeAt(index);
    this.lisService.eliminarItem(index);
  }
}

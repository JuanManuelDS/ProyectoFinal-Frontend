import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, Listado } from 'src/app/models/listado.interface';
import { ListadoService } from 'src/app/services/listado.service';
import convertBase64 from 'src/app/utils/convertBase64';

@Component({
  selector: 'app-formulario-listado',
  templateUrl: './formulario-listado.component.html',
  styleUrls: ['./formulario-listado.component.css'],
})
export class FormularioListadoComponent {

  imagen: any;

  // NUEVOS
  nuevoListado: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    imagen: [],
    items: this.fb.array([])

  });

  nuevoItem: FormGroup = this.fb.group({
    unidades: [0],
    item: [''],
    precio: [0]
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

  constructor(private fb: FormBuilder, private lisService: ListadoService) {}


  cambiarTitulo() {
    let titulo = this.nuevoListado.get('titulo')?.value;
    this.lisService.cambiarTitulo(titulo);
  }

  guardarItem() {
    let item: Item = {
      unidades: this.nuevoItem.get('unidades')?.value,
      item: this.nuevoItem.get('item')?.value,
      precio: this.nuevoItem.get('precio')?.value
    };
    this.lisService.guardarItem(item);

    let list = this.nuevoListado.get('items') as FormArray;
    list.push(
      this.fb.group({
        unidades: [item.unidades],
        item: [item.item],
        precio: [item.precio]
      })
    );

    this.guardarListado();
    this.nuevoItem.reset();
  }

  guardarListado() {
    let listado: Listado = {
      titulo: this.nuevoListado.get('titulo')?.value,
      imagen: this.imagen,
      items: this.nuevoListado.get('items')?.value
    }

    this.arrListado.push(
      this.fb.group({
        titulo: [listado.titulo],
        imagen: [listado.imagen],
        items: [listado.items]
      })
    );
  }

  async cargarImagen(event: any) {
    console.log('me disparo');

    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    console.log('me disparo');
    this.imagen = base64;
    this.lisService.cargarImagen(base64);
  }

  generarPDF() {
    this.crearPDF.emit(true);
  }


  eliminarItem(index: number) {
    let item = this.nuevoListado.get('items') as FormArray;
    item.removeAt(index);
    this.lisService.eliminarItem(index);
  }
}

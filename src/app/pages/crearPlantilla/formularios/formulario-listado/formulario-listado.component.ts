import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/listado.interface';
import { ListadoService } from 'src/app/services/listado.service';
import convertBase64 from 'src/app/utils/convertBase64';

@Component({
  selector: 'app-formulario-listado',
  templateUrl: './formulario-listado.component.html',
  styleUrls: ['./formulario-listado.component.css'],
})
export class FormularioListadoComponent {
  nuevoItem: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    item: ['', [Validators.required]],
    imagen: [],
  });

  listado: FormGroup = this.fb.group({
    listado: this.fb.array([]),
  });

  @Output() crearPDF = new EventEmitter();

  constructor(private fb: FormBuilder, private lisService: ListadoService) {}

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
    console.log('me disparo');

    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    console.log('me disparo');
    this.lisService.cargarImagen(base64);
  }

  generarPDF() {
    this.crearPDF.emit(true);
  }

  eliminarItem(index: number) {
    this.arrListado.removeAt(index);
    this.lisService.eliminarItem(index);
  }
}

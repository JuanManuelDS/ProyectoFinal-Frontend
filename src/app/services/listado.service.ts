import { Injectable } from '@angular/core';
import { Item, Listado } from '../models/listado.interface';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PlantillasService } from './plantillas.service';
import { Plantilla } from '../models/plantillas.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ListadoService {
  private _listado: Item[] = [];
  private _titulo: string = '';
  private _imagen: any;
  private _nombreArchivo: string = '';

  private _listadoForm: FormGroup = this.fb.group({
    titulo: '',
    items: this.fb.array([]),
  });

  constructor(private ps: PlantillasService, private fb: FormBuilder) {}

  guardarPDF() {
    const data: any = document.getElementById('documento');
    html2canvas(data).then((canvas) => {
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      console.log(heightLeft);
      let position = 0;
      heightLeft -= pageHeight;
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(
          canvas,
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
          '',
          'FAST'
        );
        heightLeft -= pageHeight;
      }
      doc.save('Downld.pdf');
    });
  }

  get arrItems() {
    return this._listadoForm.controls['items'] as FormArray;
  }

  get listado() {
    return this._listado;
  }

  get titulo() {
    return this._titulo;
  }

  get imagen() {
    return this._imagen;
  }

  guardarListado() {
    const listado: Listado = { titulo: this._titulo, items: this._listado };
    const plantilla: Plantilla = {
      nombreArchivo: this._nombreArchivo,
      tipo: 'listado',
      datos: JSON.stringify(listado),
    };
    this.ps.guardarPlantilla(plantilla).subscribe((resp) => {
      console.log(resp);
    });
  }

  nombreArchivo(nombre: string) {
    this._nombreArchivo = nombre;
  }

  guardarItem(item: Item) {
    this.arrItems.push(this.fb.group({ ...item }));
    this._listado.push(item);
  }

  eliminarItem(index: number) {
    this._listado.splice(index, 1);
  }

  cambiarTitulo(titulo: string) {
    this._titulo = titulo;
  }

  cargarImagen(file: any) {
    console.log(file);
    this._imagen = file;
  }
}

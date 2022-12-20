import { Injectable } from '@angular/core';
import { Item, Listado } from '../models/listado.interface';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Plantilla } from '../models/plantillas.interface';
import { PlantillasService } from './plantillas.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ListadoService {
  private _listado: Item[] = [];
  private _titulo: string = '';
  private _imagen: any;
  nombreArchivo: string = '';

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

  get listado() {
    return this._listado;
  }

  get titulo() {
    return this._titulo;
  }

  get imagen() {
    return this._imagen;
  }

  guardarItem(item: Item) {
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

  resetearListado() {
    this._titulo = '';
    this._imagen = undefined;
    this._listado = [];
    this.nombreArchivo = '';
  }

  guardarListado() {
    const list: Listado = {
      titulo: this._titulo,
      imagen: this._imagen,
      items: this._listado
    };

    const plantilla: Plantilla = {
      nombreArchivo: this.nombreArchivo,
      tipo: 'listado',
      datos: JSON.stringify(list)
    };

    this.plantillaService.guardarPlantilla(plantilla).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/nueva-plantilla/listado/'+res.id);
    });
  }

  constructor(private plantillaService: PlantillasService, private router: Router) {}
}

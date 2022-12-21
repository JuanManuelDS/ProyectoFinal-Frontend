import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CurriculumService } from 'src/app/services/curriculum.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css'],
})
export class CurriculumComponent implements OnChanges, OnInit {
  @Input() generarPDF!: boolean;

  @ViewChild('documento') documento!: ElementRef;

  constructor(private cvService: CurriculumService) {}

  ngOnInit(): void {
    console.log('Se ejecuta curriculum-plantilla');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['generarPDF'].currentValue === true) {
      this.guardarPDF();
    }
    if (changes['imprimir'].currentValue === true) {
      console.log('hola cambió mi valor en curriculum plantilla imprimir');
    }
  }

  guardarPDF() {
    const data: any = document.getElementById('documento');
    //Cambio el estilo del div para que tenga las dimensiones A4 justo antes de exportarlo
    data.classList.remove('antes_exportar');
    data.classList.add('exportar');
    html2canvas(data).then((canvas) => {
      const image = { type: 'jpeg', quality: 0.98 };
      const margin = [0.5, 0.5];
      const filename = 'myfile.pdf';

      var imgWidth = 8.5;
      var pageHeight = 11;

      var innerPageWidth = imgWidth - margin[0] * 2;
      var innerPageHeight = pageHeight - margin[1] * 2;

      // Calculate the number of pages.
      var pxFullHeight = canvas.height;
      var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
      var nPages = Math.ceil(pxFullHeight / pxPageHeight);

      // Define pageHeight separately so it can be trimmed on the final page.
      var pageHeight = innerPageHeight;

      // Create a one-page canvas to split up the full image.
      var pageCanvas = document.createElement('canvas');
      var pageCtx = pageCanvas.getContext('2d');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pxPageHeight;

      // Initialize the PDF.
      var pdf = new jsPDF('p', 'in', [8.5, 11]);

      for (var page = 0; page < nPages; page++) {
        // Trim the final page to reduce file size.
        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
          pageCanvas.height = pxFullHeight % pxPageHeight;
          pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        }

        // Display the page.
        var w = pageCanvas.width;
        var h = pageCanvas.height;
        pageCtx!.fillStyle = 'white';
        pageCtx!.fillRect(0, 0, w, h);
        pageCtx!.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        // Add the page to the PDF.
        if (page > 0) pdf.addPage();
        debugger;
        var imgData = pageCanvas.toDataURL(
          'image/' + image.type,
          image.quality
        );
        pdf.addImage(
          imgData,
          image.type,
          margin[1],
          margin[0],
          innerPageWidth,
          pageHeight
        );
      }
      //Cambio el estilo del div para que vuelva a su tamaño y estilos anteriores a la exportación
      data.classList.remove('exportar');
      data.classList.add('antes_exportar');
      pdf.save();
    });
  }

  get datos() {
    return this.cvService.datos;
  }

  get experiencias() {
    return this.cvService.experiencias;
  }

  get estudios() {
    return this.cvService.estudios;
  }

  get conocimientos() {
    return this.cvService.conocimientos;
  }

  get idiomas() {
    return this.cvService.idiomas;
  }

  get datosInteres() {
    return this.cvService.datosInteres;
  }
}

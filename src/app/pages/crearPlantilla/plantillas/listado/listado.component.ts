import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnChanges {
  @Input() generarPDF!: boolean;

  @ViewChild('documento') documento!: ElementRef;

  constructor(private lisService: ListadoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['generarPDF'].currentValue === true) {
      this.guardarPDF();
    }
  }

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

  get titulo() {
    return this.lisService.titulo;
  }

  get imagen() {
    return this.lisService.imagen;
  }

  get listado() {
    return this.lisService.listado;
  }
}

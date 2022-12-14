import { Component } from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent {
  constructor(private lisService: ListadoService) {}

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

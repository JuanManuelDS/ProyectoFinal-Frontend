import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartaRestauranteService } from 'src/app/services/cartaRestaurante.service';

@Component({
  selector: 'app-formulario-cartaRestaurante',
  templateUrl: './formulario-cartaRestaurante.component.html',
  styleUrls: ['./formulario-cartaRestaurante.component.css']
})
export class FormularioCartaRestauranteComponent implements OnInit {
  abajo: boolean = true;
  nuevoItem: any;

  seccionForm: FormGroup = this.fb.group({
    nombre: ['']
  });

  constructor( private fb: FormBuilder, private crService: CartaRestauranteService) { }

  ngOnInit() {
  }

  cambiarIcono() {
    if (this.abajo) {
      this.abajo = false;
    } else this.abajo = true;
  }

  guardarItem() {

  }

  cambiarNombre(){

  }

  cargarImagen(event: any) {

  }

  limpiar(formulario: string){

  }

  guardarDatos(){

  }

  generarPDF(){

  }
}

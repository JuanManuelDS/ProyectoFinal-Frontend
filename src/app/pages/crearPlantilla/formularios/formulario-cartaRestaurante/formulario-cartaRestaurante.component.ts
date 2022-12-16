import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Plato } from 'src/app/models/cartarestaurant.interface';
import { CartaRestauranteService } from 'src/app/services/cartaRestaurante.service';

@Component({
  selector: 'app-formulario-cartaRestaurante',
  templateUrl: './formulario-cartaRestaurante.component.html',
  styleUrls: ['./formulario-cartaRestaurante.component.css']
})
export class FormularioCartaRestauranteComponent implements OnInit {
  nuevoItem: FormGroup = this.fb.group({
    nombre: [''],
    imagen: [],
    secciones: this.fb.array([]),
    menus: this.fb.array([])
  });

  // NUEVOS
  nuevaSeccionForm: FormGroup = this.fb.group({
    nombre: [''],
    imagen: [],
    platosSeccion: this.fb.array([])
  });

  nuevoMenuForm: FormGroup = this.fb.group({
    nombre: [''],
    imagen: [],
    precio: [''],
    platosMenu: this.fb.array([])
  });

  nuevoPlatoForm: FormGroup = this.fb.group({
    nombre: [''],
    descripcion: [''],
    precio: ['']
  })

  // TODOS
  seccionesForm: FormGroup = this.fb.group({
    secciones: this.fb.array([])
  });

  menusForm: FormGroup = this.fb.group({
    menus: this.fb.array([])
  });

  // GETTERS

  get arrSecciones(){
    return this.seccionesForm.get('secciones') as FormArray;
  }

  get arrMenus(){
    return this.menusForm.controls['menus'] as FormArray;
  }

  get platosSeccion(){
    return this.nuevaSeccionForm.controls['platosSeccion'] as FormArray;

  }

  get platosMenu() {
    return this.menusForm.get('menus')?.get('platosMenu') as FormArray;
  }

  constructor( private fb: FormBuilder, private crService: CartaRestauranteService) { }

  ngOnInit() {
  }

  guardarPlatosSeccion(){
    console.log('1');
    let plato: Plato = {
      nombre: this.nuevoPlatoForm.get('nombre')?.value,
      descripcion: this.nuevoPlatoForm.get('descripcion')?.value,
      precio: this.nuevoPlatoForm.get('precio')?.value
    };
    console.log('2');
    this.crService.addPlato(plato);
    console.log('3');
    // TENDRE QUE HACER OTRO FUNCION PARA GUARDAR PLATOS EN MENU,
    // AÚN ASÍ, NECESITO PODER DIFERENCIAR ENTRE LOS DIFERENTES
    // MENUS AL IGUAL QUE LAS SECCIONES

    let parray = this.nuevaSeccionForm.get('platosSeccion') as FormArray;
    console.log('4');
    parray.push(
      this.fb.group({
        nombre: [plato.nombre],
        descripcion: [plato.descripcion],
        precio: [plato.precio]
      })
    );
    console.log('5');
    console.log(parray.at(0).value);
    console.log(this.nuevaSeccionForm.controls);

    this.nuevoPlatoForm.reset();
  }

  guardarPlatoMenu(){

  }

  guardarSeccion(){

  }

  guardarMenu(){

  }

  guardarItem() {

  }

  cambiarNombre(){

  }

  cargarImagen(event: any) {

  }

  limpiar(formulario: string){

  }



  generarPDF(){

  }
}

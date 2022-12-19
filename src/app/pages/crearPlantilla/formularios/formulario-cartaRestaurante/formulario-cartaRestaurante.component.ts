import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Menu, Plato, Seccion, Cartarestaurant } from 'src/app/models/cartarestaurant.interface';
import { CartaRestauranteService } from 'src/app/services/cartaRestaurante.service';
import convertBase64 from 'src/app/utils/convertBase64';

@Component({
  selector: 'app-formulario-cartaRestaurante',
  templateUrl: './formulario-cartaRestaurante.component.html',
  styleUrls: ['./formulario-cartaRestaurante.component.css']
})
export class FormularioCartaRestauranteComponent implements OnInit {

  imagen: any;

  @Output() crearPDF = new EventEmitter();

  // NUEVOS
  nuevoRestaurante: FormGroup = this.fb.group({
    nombre: [''],
    imagen: [],
    secciones: this.fb.array([]),
    menus: this.fb.array([])
  });

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

  restauranteForm: FormGroup = this.fb.group({
    restaurante: this.fb.array([])
  });

  // GETTERS

  get arrSecciones(){
    return this.seccionesForm.controls['secciones'] as FormArray;
  }

  get arrMenus(){
    return this.menusForm.controls['menus'] as FormArray;
  }

  get platosSeccion(){
    return this.nuevaSeccionForm.controls['platosSeccion'] as FormArray;

  }

  get platosMenu() {
    return this.nuevoMenuForm.controls['platosMenu'] as FormArray;
  }

  get arrRestaurante() {
    return this.restauranteForm.controls['restaurante'] as FormArray;
  }

  constructor( private fb: FormBuilder, private crService: CartaRestauranteService) { }

  ngOnInit() {
  }

  // ------------------ GUARDAR OBJETOS ----------------------

  guardarNombre(){
    let nombre = this.nuevoRestaurante.get('nombre')?.value;
    this.crService.addNombre(nombre);
  }

  guardarPlatosSeccion(){
    let plato: Plato = {
      nombre: this.nuevoPlatoForm.get('nombre')?.value,
      descripcion: this.nuevoPlatoForm.get('descripcion')?.value,
      precio: this.nuevoPlatoForm.get('precio')?.value
    };

    this.crService.addPlato(plato);

    let parray = this.nuevaSeccionForm.get('platosSeccion') as FormArray;
    parray.push(
      this.fb.group({
        nombre: [plato.nombre],
        descripcion: [plato.descripcion],
        precio: [plato.precio]
      })
    );

    this.nuevoPlatoForm.reset();
  }

  guardarSeccion(){
    let seccion: Seccion = {
      nombre: this.nuevaSeccionForm.get('nombre')?.value,
      imagen: this.nuevaSeccionForm.get('imagen')?.value,
      platos: this.nuevaSeccionForm.get('platosSeccion')?.value,
    }

    this.crService.addSeccion(seccion);

    this.arrSecciones.push(
      this.fb.group({
        nombre: [seccion.nombre],
        imagen: [seccion.imagen],
        platos: [seccion.platos]
      })
    );

    while(this.platosSeccion.length){
      this.platosSeccion.removeAt(0);
    }

    this.nuevaSeccionForm.reset();
  }

  guardarPlatoMenu(){
    let plato: Plato = {
      nombre: this.nuevoPlatoForm.get('nombre')?.value,
      descripcion: this.nuevoPlatoForm.get('descripcion')?.value,
      precio: this.nuevoPlatoForm.get('precio')?.value
    };

    this.crService.addPlato(plato);

    let parray = this.nuevoMenuForm.get('platosMenu') as FormArray;
    parray.push(
      this.fb.group({
        nombre: [plato.nombre],
        descripcion: [plato.descripcion],
        precio: [plato.precio]
      })
    );

    this.nuevoPlatoForm.reset();
  }

  guardarMenu(){
    let menu: Menu = {
      nombre: this.nuevoMenuForm.get('nombre')?.value,
      imagen: this.nuevoMenuForm.get('imagen')?.value,
      precioMenu: this.nuevoMenuForm.get('precio')?.value,
      platos: this.nuevoMenuForm.get('platosMenu')?.value
    }

    this.crService.addMenu(menu);

    this.arrMenus.push(
      this.fb.group({
        nombre: [menu.nombre],
        imagen: [menu.imagen],
        precioMenu: [menu.precioMenu],
        platos: [menu.platos]
      })
    );

    while(this.platosMenu.length){
      this.platosMenu.removeAt(0);
    }

    this.nuevoMenuForm.reset();
  }

  guardarRestaurante() {
    let restaurante: Cartarestaurant = {
      nombre: this.crService.nombre,
      imagen: this.imagen,
      secciones: this.arrSecciones.get('secciones')?.value,
      menus: this.arrMenus.get('menus')?.value
    }

    this.arrRestaurante.push(
      this.fb.group({
        nombre: [restaurante.nombre],
        imagen: [restaurante.imagen],
        secciones: [restaurante.secciones],
        menus: [restaurante.menus]
      })
    );
  }

  // ---------------- ELIMINAR -------------------

  eliminarPlatoSeccion(i: number) {
    let parray = this.nuevaSeccionForm.get('platosSeccion') as FormArray;
    parray.removeAt(i);

    this.crService.eliminarPlato(i);
  }

  eliminarSeccion(i: number) {
    this.arrSecciones.removeAt(i);

    this.crService.eliminarSeccion(i);
  }

  eliminarPlatoMenu(i:number) {
    let parray = this.nuevoMenuForm.get('platosMenu') as FormArray;
    parray.removeAt(i);

    this.crService.eliminarPlato(i);
  }

  eliminarMenu(i: number) {
    this.arrMenus.removeAt(i);

    this.crService.eliminarMenu(i);
  }


  async cargarImagen(event: any) {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    this.imagen = base64;
    this.crService.addPortada(base64);
  }

  limpiar(formulario: string){

  }

  generarPDF(){
    this.crearPDF.emit(true);
  }
}

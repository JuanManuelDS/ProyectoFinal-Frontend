import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  busquedaForm: FormGroup = this.fb.group({
    busqueda: [''],
  });

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit() {
    this.adminService.cargarUsuarios().subscribe();
  }

  get tablaSeleccionada() {
    return this.adminService.tablaSeleccionada;
  }

  buscarUsuario() {
    const { busqueda } = this.busquedaForm.value;
    this.adminService.cargarUsuarioBuscado(busqueda);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plantilla } from '../models/plantillas.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PlantillasService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  guardarPlantilla(plantilla: Plantilla) {
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    //Tomo el token del local storage (en caso que lo tenga)
    const token = 'Bearer ' + localStorage.getItem('token');

    //En caso que no tenga un token en el localstorage paso un string vacío
    const headers = new HttpHeaders().set('Authorization', token || '');

    const url = `https://proyectofinal-backend-production-8cff.up.railway.app/api/plantillas/${nombreUsuario}`;
    return this.http.post<Plantilla>(url, plantilla, { headers });
  }
  actualizarPlantilla(id: number, plantilla: Plantilla) {
    //Tomo el token del local storage (en caso que lo tenga)
    const token = 'Bearer ' + localStorage.getItem('token');
    const username = localStorage.getItem('nombreUsuario');
    //En caso que no tenga un token en el localstorage paso un string vacío
    const headers = new HttpHeaders().set('Authorization', token || '');

    const url = `https://proyectofinal-backend-production-8cff.up.railway.app/api/plantillas/${id}/${username}`;
    return this.http.put<Plantilla>(url, plantilla, { headers });
  }

  getPlantillas() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    console.log(nombreUsuario);

    //Tomo el token del local storage (en caso que lo tenga)
    const token = 'Bearer ' + localStorage.getItem('token');

    //En caso que no tenga un token en el localstorage paso un string vacío
    const headers = new HttpHeaders().set('Authorization', token || '');

    const url = `https://proyectofinal-backend-production-8cff.up.railway.app/api/plantillas/buscar/nombreUsuario/${nombreUsuario}`;
    return this.http.get<Plantilla[]>(url, { headers });
  }

  getPlantilla(id: number) {
    //Tomo el token del local storage (en caso que lo tenga)
    const token = 'Bearer ' + localStorage.getItem('token');

    //En caso que no tenga un token en el localstorage paso un string vacío
    const headers = new HttpHeaders().set('Authorization', token || '');

    const url = `https://proyectofinal-backend-production-8cff.up.railway.app/api/plantillas/buscar/id/${id}`;
    return this.http.get<Plantilla>(url, { headers });
  }

  deletePlantilla(id: number) {
    //Tomo el token del local storage (en caso que lo tenga)
    const token = 'Bearer ' + localStorage.getItem('token');

    //En caso que no tenga un token en el localstorage paso un string vacío
    const headers = new HttpHeaders().set('Authorization', token || '');

    const url = `https://proyectofinal-backend-production-8cff.up.railway.app/api/plantillas/${id}`;
    return this.http.delete<Plantilla>(url, { headers });
  }

  get usuario() {
    return this.authService.usuario;
  }
}

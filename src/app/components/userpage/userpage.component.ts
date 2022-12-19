import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  nombreUsuario: string | null = '';

  constructor() { }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
  }

}

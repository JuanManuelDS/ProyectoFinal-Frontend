import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { PlantillasTableComponent } from './plantillas-table/plantillas-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AdminMenuComponent,
    PlantillasTableComponent,
    UsersTableComponent,
  ],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule],
})
export class AdminModule {}

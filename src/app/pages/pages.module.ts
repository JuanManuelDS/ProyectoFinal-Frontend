import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { CrearPlantillaComponent } from './crearPlantilla/crearPlantilla.component';
import { DashboardUsuarioComponent } from './dashboardUsuario/dashboardUsuario.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './loginRegister/loginRegister.component';
import { LoginComponent } from './loginRegister/login/login.component';
import { RegisterComponent } from './loginRegister/register/register.component';
import { ComponentsModule } from '../components/components.module';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { UsersTableComponent } from './admin/users-table/users-table.component';
import { PlantillasTableComponent } from './admin/plantillas-table/plantillas-table.component';

@NgModule({
  imports: [CommonModule, ComponentsModule],
  declarations: [
    AdminComponent,
    CrearPlantillaComponent,
    DashboardUsuarioComponent,
    HomeComponent,
    LoginRegisterComponent,
    LoginComponent,
    RegisterComponent,
    AdminMenuComponent,
    UsersTableComponent,
    PlantillasTableComponent,
  ],
  exports: [
    AdminComponent,
    CrearPlantillaComponent,
    DashboardUsuarioComponent,
    HomeComponent,
    LoginRegisterComponent,
    
  ],
})
export class PagesModule {}

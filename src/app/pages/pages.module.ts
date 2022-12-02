import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { CrearPlantillaComponent } from './crearPlantilla/crearPlantilla.component';
import { DashboardUsuarioComponent } from './dashboardUsuario/dashboardUsuario.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './loginRegister/loginRegister.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AdminComponent,
    CrearPlantillaComponent,
    DashboardUsuarioComponent,
    HomeComponent,
    LoginRegisterComponent,
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

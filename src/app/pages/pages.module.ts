import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardUsuarioComponent } from './dashboardUsuario/dashboardUsuario.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './loginRegister/loginRegister.component';
import { LoginComponent } from './loginRegister/login/login.component';
import { RegisterComponent } from './loginRegister/register/register.component';
import { ComponentsModule } from '../components/components.module';
import { CrearPlantillaModule } from './crearPlantilla/crearPlantilla.module';
import { AdminModule } from './admin/admin.module';
import { UserpageComponent } from '../components/userpage/userpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    CrearPlantillaModule,
    AdminModule,
    MaterialModule
  ],
  declarations: [
    DashboardUsuarioComponent,
    HomeComponent,
    LoginRegisterComponent,
    LoginComponent,
    RegisterComponent,
    UserpageComponent,
  ],
  exports: [DashboardUsuarioComponent, HomeComponent, LoginRegisterComponent],
})
export class PagesModule {}

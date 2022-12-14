import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { CrearPlantillaComponent } from './pages/crearPlantilla/crearPlantilla.component';
import { DashboardUsuarioComponent } from './pages/dashboardUsuario/dashboardUsuario.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './pages/loginRegister/loginRegister.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginRegisterComponent,
  },
  {
    path: 'register',
    component: LoginRegisterComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'dashboard',
    component: DashboardUsuarioComponent,
  },
  {
    path: 'nueva-plantilla/:plantilla',
    component: CrearPlantillaComponent,
  },
  {
    path: 'nueva-plantilla',
    component: DashboardUsuarioComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

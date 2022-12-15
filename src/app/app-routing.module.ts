import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
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
    path: 'nueva-plantilla',
    component: CrearPlantillaComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    component: AboutComponent
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

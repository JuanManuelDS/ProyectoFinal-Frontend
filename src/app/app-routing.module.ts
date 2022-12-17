import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { ValidarAdminGuard } from './guards/validar-admin.guard';
import { ValidarTokenGuard } from './guards/validar-token.guard';
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
    canActivate: [ValidarAdminGuard],
    canLoad: [ValidarAdminGuard],
  },
  {
    path: 'dashboard',
    component: DashboardUsuarioComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'nueva-plantilla/:plantilla',
    component: CrearPlantillaComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'nueva-plantilla',
    component: DashboardUsuarioComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
  {
    path: 'about-us',
    component: AboutComponent,
  },
  {
    path: 'user',
    component: UserpageComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
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

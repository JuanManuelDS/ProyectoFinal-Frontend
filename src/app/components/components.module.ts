import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLandingComponent } from './navbarLanding/navbarLanding.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarLogueadoComponent } from './navbarLogueado/navbarLogueado.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NavbarLandingComponent,
    NavbarLogueadoComponent,
    FooterComponent,
  ],
  exports: [NavbarLandingComponent, NavbarLogueadoComponent, FooterComponent],
})
export class ComponentsModule {}

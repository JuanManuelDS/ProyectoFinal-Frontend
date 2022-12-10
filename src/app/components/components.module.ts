import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLandingComponent } from './navbarLanding/navbarLanding.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarLogueadoComponent } from './navbarLogueado/navbarLogueado.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NavbarLandingComponent,
    NavbarLogueadoComponent,
    FooterComponent,
    AboutComponent
  ],
  exports: [NavbarLandingComponent, NavbarLogueadoComponent, FooterComponent, AboutComponent],
})
export class ComponentsModule {}

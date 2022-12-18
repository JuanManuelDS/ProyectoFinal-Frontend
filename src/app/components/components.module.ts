import { NgModule } from '@angular/core';
import { NavbarLandingComponent } from './navbarLanding/navbarLanding.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarLogueadoComponent } from './navbarLogueado/navbarLogueado.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    NavbarLandingComponent,
    NavbarLogueadoComponent,
    FooterComponent,
    AboutComponent,
  ],
  exports: [
    NavbarLandingComponent,
    NavbarLogueadoComponent,
    FooterComponent,
    AboutComponent,
  ],
})
export class ComponentsModule {}

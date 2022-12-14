import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormularioCurriculumComponent } from './formularios/formulario-curriculum/formulario-curriculum.component';
import { CurriculumComponent } from './plantillas/curriculum/curriculum.component';
import { CrearPlantillaComponent } from './crearPlantilla.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListadoComponent } from './plantillas/listado/listado.component';
import { FormularioListadoComponent } from './formularios/formulario-listado/formulario-listado.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ComponentsModule],
  declarations: [
    FormularioCurriculumComponent,
    CurriculumComponent,
    CrearPlantillaComponent,
    ListadoComponent,
    FormularioListadoComponent,
  ],
})
export class CrearPlantillaModule {}

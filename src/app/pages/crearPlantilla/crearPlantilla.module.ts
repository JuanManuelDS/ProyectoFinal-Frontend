import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormularioCurriculumComponent } from './formularios/formulario-curriculum/formulario-curriculum.component';
import { CurriculumComponent } from './plantillas/curriculum/curriculum.component';
import { CrearPlantillaComponent } from './crearPlantilla.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [
    FormularioCurriculumComponent,
    CurriculumComponent,
    CrearPlantillaComponent,
  ],
})
export class CrearPlantillaModule {}

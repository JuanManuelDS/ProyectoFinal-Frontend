import { Component } from '@angular/core';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css'],
})
export class CurriculumComponent {
  get datos() {
    return this.cvService.datos;
  }

  constructor(private cvService: CurriculumService) {}
}

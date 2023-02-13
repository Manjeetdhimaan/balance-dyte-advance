import { Component } from '@angular/core';
import { fallIn } from 'src/app/shared/common/animations';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class TestimonialsComponent {

}

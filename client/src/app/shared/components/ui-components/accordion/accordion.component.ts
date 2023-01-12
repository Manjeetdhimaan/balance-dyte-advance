import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `<div><ng-content select="app-accordion-item"></ng-content> </div>`
})
export class AccordionComponent {

}

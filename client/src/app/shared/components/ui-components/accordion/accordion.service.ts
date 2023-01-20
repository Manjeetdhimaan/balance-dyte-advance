import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccordionService {

  constructor() { }

  showAccordionBody = new Subject<boolean>();
}

import { Component, OnInit } from '@angular/core';
import { fade, fallIn } from 'src/app/shared/common/animations';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class TermsConditionsComponent implements OnInit {

  ngOnInit(): void {
    
  }

}

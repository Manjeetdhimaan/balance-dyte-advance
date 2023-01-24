import { Component, OnInit } from '@angular/core';
import { fade, fallIn } from 'src/app/shared/common/animations';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class PrivacyPolicyComponent implements OnInit {

  ngOnInit(): void {
    
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

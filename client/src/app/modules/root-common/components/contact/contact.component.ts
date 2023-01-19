import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/common/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    fade
  ]
})
export class ContactComponent implements OnInit {
  ngOnInit(): void {
  }

  scrollTop() {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
}

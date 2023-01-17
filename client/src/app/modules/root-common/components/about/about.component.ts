import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit(): void {
    this.scrollTop();
  }

  scrollTop() {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
}

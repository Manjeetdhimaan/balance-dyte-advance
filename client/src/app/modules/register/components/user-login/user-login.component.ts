import { Component } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
}

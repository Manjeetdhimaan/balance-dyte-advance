import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private userApiService: UserApiService) {
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    // this.router.navigate([route])
  }

  isLoggedIn() {
    return this.userApiService.isLoggedIn();
  }

  onLogOut() {
    this.userApiService.deleteToken();
    this.router.navigate(['/diet-plans/advance-plan']);
  }
}

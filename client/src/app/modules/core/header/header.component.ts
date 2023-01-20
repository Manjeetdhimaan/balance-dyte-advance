import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccordionService } from 'src/app/shared/components/ui-components/accordion/accordion.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private userApiService: UserApiService, private accordionService: AccordionService) {
  }
  showAccordionBody: boolean = false;

  scrollTop() {
    this.accordionService.showAccordionBody.next(false);
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
    this.router.navigate(['/user/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccordionService } from 'src/app/shared/components/ui-components/accordion/accordion.service';
import { ContactDetails } from 'src/app/shared/models/contact-details.model';
import { ContactDetailsApiService } from 'src/app/shared/services/contact-details.api.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showAccordionBody: boolean = false;
  phone: string[];
  email: string[];
  socialMediaLinks: any;

  constructor(private router: Router, private userApiService: UserApiService, private accordionService: AccordionService, private contactDetailsApiService: ContactDetailsApiService) {}

  ngOnInit(): void {
    this.contactDetailsApiService.getContactDetails().subscribe((res: any) => {
      this.phone = res['details'][0]['phone'];
      this.email = res['details'][0]['email'];
      this.socialMediaLinks = res['details'][0]['socialMediaLinks'];
    })
  }

  scrollTop() {
    this.accordionService.showAccordionBody.next(false);
    window.scrollTo({
      top: 0
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

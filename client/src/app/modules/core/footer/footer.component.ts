import { Component, OnInit } from '@angular/core';
import { ContactDetailsApiService } from 'src/app/shared/services/contact-details.api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  phones: string[];
  emails: string[];
  socialMediaLinks: any;
  currentYear = new Date().getFullYear();
  
  constructor (private contactDetailsApiService: ContactDetailsApiService) {}

  ngOnInit() {
    this.contactDetailsApiService.getContactDetails().subscribe((res: any) => {
      this.phones = res['details'][0]['phone'];
      this.emails = res['details'][0]['email'];
      this.socialMediaLinks = res['details'][0]['socialMediaLinks'];
    })
  }
 
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fade, fallIn } from 'src/app/shared/common/animations';
import { RegexEnum } from 'src/app/shared/common/constants/regex';
import { ContactDetailsApiService } from 'src/app/shared/services/contact-details.api.service';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;

  phones: string[] = ['+91 7696492843'];
  emails: string[] = ['balancedyte@gmail.com'];
  socialMediaLinks: any;

  constructor(private userApiService: UserApiService, private toasTMessageService: ToasTMessageService, private contactDetailsApiService: ContactDetailsApiService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.email)]),
      phone: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required, Validators.minLength(4)]),
      message: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

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

  get f() {
    return this.contactForm.controls;
  }

  submitContactForm(contactForm: FormGroup) {
    this.submitted = true;
    if (!contactForm.valid) {
      return;
    }
    else {
      this.isLoading = true;
      const formObj = Object.assign({}, contactForm.value, { domain: environment.domain })
      this.userApiService.postContactForm(formObj).subscribe((res: any) => {
        this.toasTMessageService.success(res['message']);
        this.isLoading = false;
        this.scrollTop();
      }, err => {
        console.log(err);
        this.toasTMessageService.success(err.error['message']);
        this.isLoading = false;
      })
    }
  }
}

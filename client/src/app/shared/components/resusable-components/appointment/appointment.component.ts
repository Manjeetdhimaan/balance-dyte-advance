import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegexEnum } from 'src/app/shared/common/constants/regex';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers: [
    DatePipe
]
})
export class AppointmentComponent {

  appointMentForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(private userApiService: UserApiService, private toasTMessageService: ToasTMessageService,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.appointMentForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.email)]),
      phone: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required, Validators.min(1)]),
      message: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  get f() {
    return this.appointMentForm.controls;
  }

  checkDate() {
    this.datePipe.transform(Date.now(),'dd-MM-yyyy') 
  }

  submitAppointMentForm(appointMentForm: FormGroup) {
    this.submitted = true;
     
    console.log(this.datePipe.transform(Date.now(),'dd-MM-yyyy'));
    if (!appointMentForm.valid) {
      return;
    }
    else {
      this.isLoading = true;
      appointMentForm.value.date = this.datePipe.transform(Date.now(),'dd-MM-yyyy')
      const formObj = Object.assign({}, appointMentForm.value, { domain: environment.domain })
      this.userApiService.postAppointMentForm(formObj).subscribe((res: any) => {
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
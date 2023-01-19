import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fade } from 'src/app/shared/common/animations';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css'],
  animations: [
    fade
  ]
})
export class RequestResetComponent implements OnInit {
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
  isLoading: boolean = false;

  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private toastMessageService: ToasTMessageService
   ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser() {
    this.successMessage = '';
    this.errorMessage = '';
    this.RequestResetForm.value.domain = environment.domain;
    if (this.RequestResetForm.valid) {
      this.isLoading = true;
      this.IsvalidForm = true;
      this.userApiService.requestResetPassword(this.RequestResetForm.value).subscribe(
        data => {
          this.isLoading = false;
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link sent to your email, please check your email inbox";
          this.toastMessageService.success("Reset password link sent to your email, please check your email inbox");
        },
        err => {
          this.isLoading = false;
          if (err.error.message) {
            this.errorMessage = err.error.message;
            this.toastMessageService.error(err.error.message);
          }
        }
      );
    } else {
      this.IsvalidForm = false;
      this.isLoading = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  isLoading: boolean = false;
  IsResetFormValid = true;
  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {

    this.CurrentState = 'Wait';
    this.activatedRoute.params.subscribe(params => {
      this.resetToken = params['token'];
      this.VerifyToken();
    });
  }


  ngOnInit() {

    this.Init();
  }

  VerifyToken() {
    this.isLoading = true;
    this.userApiService.validatePasswordToken({ resettoken: this.resetToken }).subscribe(
      data => {
        this.isLoading = false;
        this.CurrentState = 'Verified';
      },
      err => {
        this.isLoading = false;
        this.CurrentState = 'NotVerified';
      }
    );
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }, 
      // { asvalidator: this.matchingInputsValidator('newPassword', 'confirmNewPassword') }
      {
        validator: this.Validate(this.ResponseResetForm),
      }
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls['newPassword'].value;
    const confirm_password = passwordFormGroup.controls['confirmPassword'].value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }
    return {
      doesNotMatch: false
    };
  }


  ResetPassword(form: FormGroup) {
    if (form.valid) {
      this.isLoading = true;
      this.IsResetFormValid = true;
      this.userApiService.newPassword(this.ResponseResetForm.value).subscribe(
        (data: any) => {
          this.isLoading = false;
          this.ResponseResetForm.reset();
          this.successMessage = data.message;
          // setTimeout(() => {
          //   this.successMessage = "";
          //   // this.router.navigate(['sign-in']);
          // }, 3000);
        },
        err => {
          this.isLoading = false;
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else { this.IsResetFormValid = false; }
  }
}
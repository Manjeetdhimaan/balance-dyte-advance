import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';


export interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  isLoading: boolean = false;

  get value(): PasswordFormValues {
    return this.changePasswordForm.value;
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private toastMessageService: ToasTMessageService, private router: Router) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    }, 
    // { asvalidator: this.matchingInputsValidator('newPassword', 'confirmNewPassword') }
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmNewPassword'),
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

   matchingInputsValidator(firstKey: string, secondKey: string) {
    return function (group: FormGroup): ValidationErrors | undefined {
      if (group.controls[firstKey].value !== group.controls[secondKey].value) {
        console.log('missmatch', group.controls[firstKey].value)
        return {
          'missmatch': true
        };
      }
      return {
        'missmatch': false
      };
    };
  }

  get newPasswordControl() {
    console.log(this.changePasswordForm.controls['newPassword'].value)
    return this.changePasswordForm.controls['newPassword'].value;
  }

  get confirmNewPasswordControl() {
    console.log(this.changePasswordForm.hasError('missmatch'));
    return this.changePasswordForm.controls['confirmNewPassword'].value;
  }

  submitForm() {
    // const userPayloadId = this.userApiService.getUserPayload()['_id'];
    const formData = this.changePasswordForm.value;
    try {
      if (!this.changePasswordForm.valid) {
        // show some error message
        console.log('Form values are not valid');
        return;
      }
      this.isLoading = true;
      this.userApiService.putChangePassword(formData).subscribe((res:any) => {
        this.isLoading = false;
        
        // this.showSucessMessage = true;
        if(res.success === true){
          this.toastMessageService.success(res['message']);
          this.isLoading = false;
          this.router.navigate([`/account/profile`]);
        }
      },
        err => {
          this.toastMessageService.error(err['error']['message']);
          this.isLoading = false;
        })
    }
    catch {
      console.log('some error occured');
      this.isLoading = false;
    }
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
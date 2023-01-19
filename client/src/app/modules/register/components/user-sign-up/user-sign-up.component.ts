import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fade } from 'src/app/shared/common/animations';
import { RegexEnum } from 'src/app/shared/common/constants/regex';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css'],
  animations: [
    fade
  ]
})
export class UserSignUpComponent implements OnInit {

  constructor(private fb: FormBuilder, private userApiService: UserApiService, private toastMessageService: ToasTMessageService, private router: Router) {

  }

  userForm: FormGroup;
  submitted: boolean;
  isLoading: boolean = false;
  serverErrMsg: string = '';

  ngOnInit(): void {
    this.scrollTop();
    // user form
    this.userForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.email)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      // image: new FormControl('', {asyncValidators: mimeType})
    },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      });
  }

  get f() {
    return this.userForm.controls;
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

  submitForm() {
    this.submitted = true;
    this.serverErrMsg = '';
    if (!this.userForm.valid) {
      console.log('form not valid');
      this.toastMessageService.info('Please fill all required fields with valid values!');
      return;
    }
    else {
      this.isLoading = true;
      const formBody = {
        fullName: this.userForm.value.fullName,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        confirmPassword: this.userForm.value.confirmPassword,
      }
      this.userApiService.postRegisterUser(formBody).subscribe((res: any) => {
        this.isLoading = false;
        this.toastMessageService.success(res['message']);
        this.router.navigate(['/user/login'])

      }, error => {
          this.isLoading = false;
          this.toastMessageService.error(error.error.message);
          this.serverErrMsg = error.error.message;
          // if (error.status === 409 || error.statusText === "Conflict") {
          //   this.isConflictErr = true;
          //   this.emailInputValue = this.userForm.value.email;
          //   this.isLoading = false;
          //   if (this.isConflictErr) {
          //     this.showModel();
          //   }
          // }
          // else {
          //   this.isLoading = false;
          //   this.toastMessageService.error(error.error.message);
          // }
        })
    }

  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}

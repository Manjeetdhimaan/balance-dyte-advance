import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fade } from 'src/app/shared/common/animations';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  animations: [
    fade
  ]
})
export class UserLoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router, private toastMessageService: ToasTMessageService) { }

  loginForm: FormGroup;
  errMsg: String = '';
  isShowPassword: boolean = false;
  serverErrorMessages: string;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    this.serverErrorMessages = '';
    if (!this.loginForm.valid) {
      return;
    }
    else {
      this.isLoading = true;
      try {
        this.userApiService.postLogin(this.loginForm.value).subscribe(
          (res: any) => {
            this.userApiService.setToken(res['token']);
            this.router.navigate([`/diet-plans`]);
            this.scrollTop();
            this.isLoading = false;
          },
          err => {
            this.serverErrorMessages = err.error['message'];
            this.isLoading = false;
          }
        );
      }
      catch {
        this.toastMessageService.error('An unknown error occured! Please try again after sometime.')
      }

    }

  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}

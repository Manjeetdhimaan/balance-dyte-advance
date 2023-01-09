import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router) {}

  loginForm: FormGroup;
  errMsg: String = '';
  isShowPassword: boolean = false;
  serverErrorMessages: string;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    this.userApiService.postLogin(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('name', res['name']);
        this.userApiService.setToken(res['token']);
        this.router.navigate([`/diet-plans`]);
        this.scrollTop();
      },
      err => {
        console.log(err);
        this.serverErrorMessages = err.error.message;
        // setTimeout(() => {
        //   this.serverErrorMessages = '';
        // }, 8000);
      }
    );
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}

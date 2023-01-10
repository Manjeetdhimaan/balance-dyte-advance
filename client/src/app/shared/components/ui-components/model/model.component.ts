import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {

  @Input() component:any;
  @Input() emailInputValue:string = '';

  constructor(private formBuilder: FormBuilder, private userApiService: UserApiService, private router: Router) {}

  loginForm: FormGroup;
  errMsg: String = '';
  isShowPassword: boolean = false;
  isLoading: boolean = false;
  serverErrorMessages: string;

  ngOnInit(): void {
    console.log(this.emailInputValue)
    this.loginForm = this.formBuilder.group({
      email: [this.emailInputValue, [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (!this.loginForm.valid) {
      return;
    }
    else {
      this.isLoading = true;
      this.serverErrorMessages = '';
      this.userApiService.postLogin(this.loginForm.value).subscribe(
        (res: any) => {
          this.isLoading = false;
          localStorage.setItem('name', res['name']);
          this.userApiService.setToken(res['token']);
          this.scrollToDiv();
          this.closeModal();
        },
        err => {
          this.isLoading = false;
          this.serverErrorMessages = err.error.message;
        }
      );
    }
   
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  closeModal() {
    console.log('closeModelinmodel')
    const backdrop = document.getElementById('custom-backdrop') as HTMLElement;
    backdrop.style.visibility = 'hidden';
    backdrop.style.opacity = '0';
    const model = document.getElementById('custom-modal') as HTMLElement;
    model.style.transform = 'translateY(100vh)';
  }

  scrollToDiv () {
    const div = document.getElementById("plan-details") as HTMLElement;
    div.scrollIntoView();
  }
}

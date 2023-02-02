import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fade, fallIn } from 'src/app/shared/common/animations';
import { RegexEnum } from 'src/app/shared/common/constants/regex';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private userApiService: UserApiService, private toastMessageService: ToasTMessageService) { }
  userForm: FormGroup;

  submitted: boolean;
  isLoading: boolean = false;
  isConflictErr: boolean = false;
  emailInputValue: string;
  
  ngOnInit(): void {
    this.scrollTop();
    this.isLoading = true;
    this.userForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.email)]),
      phone: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      goals: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      loseOrGain: new FormControl('', [Validators.required]),
      goingGym: new FormControl('', [Validators.required]),
      physicallyActive: new FormControl('', [Validators.required]),
      foodType: new FormControl('', [Validators.required]),
      planDuration: new FormControl('3', [Validators.required]),
      medicalIssue: new FormControl(''),
      foodAllergy: new FormControl(''),
      // image: new FormControl('', {asyncValidators: mimeType})
    });

    if (this.isLoggedIn()) {
      this.userApiService.getUserProfile().subscribe((res: any) => {
        this.userForm.patchValue({
          fullName: res['user']['fullName'],
          email: res['user']['email'],
          phone: res['user']['phone'],
          goals: res['user']['goals'],
          age: res['user']['age'],
          gender: res['user']['gender'],
          height: res['user']['height'],
          weight: res['user']['weight'],
          loseOrGain: res['user']['loseOrGain'],
          goingGym: res['user']['goingGym'],
          physicallyActive: res['user']['physicallyActive'],
          foodType: res['user']['foodType'],
          medicalIssue: res['user']['medicalIssue'],
          foodAllergy: res['user']['foodAllergy']
        })
        this.isLoading = false;
      }, err => {
        this.toastMessageService.error('An unknown error occured!');
        this.isLoading = false;
        console.log(err)
      })
    }
  }

  get f() {
    return this.userForm.controls;
  }

  submitForm() {
    if (!this.userForm.valid) {
      console.log('Form not valid');
      return;
    }
    else {
      this.isLoading = true;
      const formData = this.userForm.value;
      try {
        this.userApiService.postUpdateUserProfile(formData).subscribe((res: any) => {
          // this.showSucessMessage = true;
          this.toastMessageService.success(res['message']);
          Object.keys(this.userForm.controls).forEach(key => {
            this.userForm.controls[key].markAsPristine();
           });
          this.isLoading = false;
        },
          err => {
            console.log(err);
            if(err.error.message.code === 11000) {
              this.toastMessageService.error('An account with this email address exists already!');
            }
            else {
              this.toastMessageService.error(err['error']['message']);
            }
            
            this.isLoading = false;
          })
      }
      catch {
        this.toastMessageService.success('An unknown error occured!');
        this.isLoading = false;
      }
    }
   
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  isLoggedIn() {
    return this.userApiService.isLoggedIn();
  }

  showModel() {
    const backdrop = document.getElementById('custom-backdrop') as HTMLElement;
    backdrop.style.visibility = 'visible';
    backdrop.style.opacity = '1';
    const model = document.getElementById('custom-modal') as HTMLElement;
    model.style.transform = 'translateY(0)'
  }
   
}

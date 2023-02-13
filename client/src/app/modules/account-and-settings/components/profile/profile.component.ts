import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { fallIn } from 'src/app/shared/common/animations';
import { RegexEnum } from 'src/app/shared/common/constants/regex';
import { User } from 'src/app/shared/models/user.model';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';
import { AppState } from 'src/app/store/app.reducer';
import * as AccountActions from "../../store/account.actions";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private userApiService: UserApiService, private toastMessageService: ToasTMessageService, private store: Store<AppState>) { }
  userForm: FormGroup;

  submitted: boolean;
  isLoading: boolean = false;
  isConflictErr: boolean = false;
  emailInputValue: string;
  user: User = null;
  
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
      this.store.select('account').subscribe(stateData => {
        if(stateData.user || stateData.user !== null) {
          this.user = stateData.user;
          this.userForm.patchValue({
            fullName: stateData['user']['fullName'],
            email: stateData['user']['email'],
            phone: stateData['user']['phone'],
            goals: stateData['user']['goals'],
            age: stateData['user']['age'],
            gender: stateData['user']['gender'],
            height: stateData['user']['height'],
            weight: stateData['user']['weight'],
            loseOrGain: stateData['user']['loseOrGain'],
            goingGym: stateData['user']['goingGym'],
            physicallyActive: stateData['user']['physicallyActive'],
            foodType: stateData['user']['foodType'],
            medicalIssue: stateData['user']['medicalIssue'],
            foodAllergy: stateData['user']['foodAllergy']
          });
          this.isLoading = false;
        }
      });

      if (!this.user) {
        this.userApiService.getUserProfile().subscribe((res: any) => {
          this.user = res['user'];
          this.store.dispatch(new AccountActions.FetchUserProfile(res['user']));
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

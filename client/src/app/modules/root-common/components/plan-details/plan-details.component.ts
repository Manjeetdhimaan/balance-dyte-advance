import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegexEnum } from 'src/app/shared/common/constants/regex';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';

import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  constructor (private pricingPlanService: PricingPlanService, private router: Router, private fb: FormBuilder) {}
  pricingPlans: PricingPlan[] = [];
  selectedPricingPlan: PricingPlan;
  userForm: FormGroup

  ngOnInit(): void {
    // user form
    this.userForm = this.fb.group({
      fullName: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.textFeild)]),
      email: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.email)]),
      password: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.passwordValidation)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.passwordValidation)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.mobile)]),
      goals: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      loseOrGain: new FormControl('', [Validators.required]),
      goingGym: new FormControl('', [Validators.required]),
      foodType: new FormControl('', [Validators.required]),
      medicalIssue: new FormControl(''),
      foodAllergy: new FormControl(''),
      // image: new FormControl('', {asyncValidators: mimeType})
    },
    {
      validators: this.ConfirmedValidator('password', 'confirmPassword'),
    });

    // getting pricing plans
    this.pricingPlans = this.pricingPlanService.getPricingPlans();
    if(this.pricingPlans.length>0) {
      this.pricingPlans.map((plan: PricingPlan) => {
        if(this.router.url.toLowerCase() === plan['planRouterLink'].toLowerCase()) {
          this.selectedPricingPlan = plan;
        }
      })

      if (this.router.url.toLowerCase() !== this.selectedPricingPlan?.['planRouterLink'].toLowerCase()) {
        this.router.navigate(['/not-found'])
      }
    }
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
    console.log(this.userForm.value);
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

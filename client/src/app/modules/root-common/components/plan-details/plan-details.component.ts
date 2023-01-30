import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { fade, fallIn } from 'src/app/shared/common/animations';
import { RegexEnum } from 'src/app/shared/common/constants/regex';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
import { PricingPlanApiService } from 'src/app/shared/services/pricing-plan-api.service';

import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';
import { environment } from 'src/environments/environment';

declare let Razorpay: any;

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class PlanDetailsComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder, private userApiService: UserApiService, private toastMessageService: ToasTMessageService, private pricingPlanApiService: PricingPlanApiService) { }


  pricingPlanData: PricingPlan[] = [];
  selectedPricingPlan: PricingPlan;
  userForm: FormGroup;
  submitted: boolean;
  isLoading: boolean = false;
  isConflictErr: boolean = false;
  emailInputValue: string;
  razorPayResMsg: string;
  serverErrMsg: string;
  razorOrderId: string = '';
  userId: string;

  ngOnInit(): void {
    // user form
    console.log(this.router.url)
    this.userForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(RegexEnum.email)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      goals: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      loseOrGain: new FormControl('', [Validators.required]),
      goingGym: new FormControl('', [Validators.required]),
      foodType: new FormControl('', [Validators.required]),
      planDuration: new FormControl('1', [Validators.required]),
      medicalIssue: new FormControl(''),
      foodAllergy: new FormControl(''),
      // image: new FormControl('', {asyncValidators: mimeType})
    },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      });

      this.isLoading = true;
      this.pricingPlanApiService.getPricingPlans().subscribe(async (res: any) => {
        this.pricingPlanData = await res['plans'];
        if (this.pricingPlanData.length > 0) {
          this.isLoading = false;
          this.pricingPlanData.map((plan: PricingPlan) => {
            if (this.router.url.toLowerCase() === plan['planUrlLink'].toLowerCase()) {
              this.selectedPricingPlan = plan;
              this.isLoading = false;
              this.userForm.patchValue({
                planDuration: this.selectedPricingPlan['planDuration'],
              })
            }
          })
    
          if (this.router.url.toLowerCase() !== this.selectedPricingPlan?.['planUrlLink'].toLowerCase()) {
            this.router.navigate(['/not-found']);
            this.isLoading = false;
          }
        }
          this.isLoading = false;
      }, err => {
        console.log(err);
        this.serverErrMsg = "Error while fetching plans! Please try again."
        // this.pricingPlanData = this.pricingPlanService.getPricingPlans();
        this.isLoading = false;
      })
    // getting pricing plans
    this.isLoading = true;

    if (this.isLoggedIn()) {
      this.isLoading = true;
      this.userForm.controls['fullName'].setErrors(null);
      this.userForm.controls['fullName'].clearValidators();
      this.userForm.controls['email'].setErrors(null);
      this.userForm.controls['email'].clearValidators();
      this.userForm.controls['password'].setErrors(null);
      this.userForm.controls['password'].clearValidators();
      this.userForm.controls['confirmPassword'].setErrors(null);
      this.userForm.controls['confirmPassword'].clearValidators();
      this.userForm.controls['phone'].setErrors(null);
      this.userForm.controls['phone'].clearValidators();

      this.userApiService.getUserProfile().subscribe((res: any) => {
        this.userForm.patchValue({
          goals: res['user']['goals'],
          age: res['user']['age'],
          gender: res['user']['gender'],
          height: res['user']['height'],
          weight: res['user']['weight'],
          loseOrGain: res['user']['loseOrGain'],
          goingGym: res['user']['goingGym'],
          foodType: res['user']['foodType'],
          medicalIssue: res['user']['medicalIssue'],
          foodAllergy: res['user']['foodAllergy']
        })
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        this.toastMessageService.error(err.error.message);
      })
    }
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

  razorPayOptions = {
    "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
    "amount": 0, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Younedia",
    "description": "Test Transaction",
    "image": "/assets/images/logo/balancedyte-logo.png",
    "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": (res: any) => {
      console.log(res);
    }
  }

  razorPayResponseHandler(res: any) {
    if (res) {
      this.submitted = true;
      if (!this.userForm.valid) {
        console.log('form not valid');
        return;
      }
      this.isLoading = true;
      const formBody = {
        fullName: this.userForm.value.fullName,
        phone: this.userForm.value.phone,
        goals: this.userForm.value.goals,
        email: this.userForm.value.email,
        age: this.userForm.value.age,
        gender: this.userForm.value.gender,
        height: this.userForm.value.height,
        weight: this.userForm.value.weight,
        loseOrGain: this.userForm.value.loseOrGain,
        goingGym: this.userForm.value.goingGym,
        foodType: this.userForm.value.foodType,
        medicalIssue: this.userForm.value.medicalIssue,
        foodAllergy: this.userForm.value.foodAllergy,
        payableTotal: this.onGetPayableTotal(),
        planPrice: this.selectedPricingPlan.planPrice,
        planName: this.selectedPricingPlan.planName,
        planDuration: this.userForm.value.planDuration,
      }

      const formObj = Object.assign({}, formBody, { domain: environment.domain, order_id: this.razorOrderId, userId: this.userId, planUrl: this.router.url  });

      this.userApiService.postOrderResponse(formObj).subscribe((res: any) => {
        this.isLoading = false;
        this.razorPayResMsg = res['message']
        this.toastMessageService.success(res['message']);
        if (this.isLoggedIn()) {
          this.router.navigate(['/account/profile/orders']);
        }
        else {
          this.router.navigate(['/diet-plans']);
        }
      }, error => {
        this.isLoading = false;
        this.toastMessageService.error('An error occured with payment, please try again');
        console.log("error", error);
      })
    }
  }

  submitForm() {
    this.submitted = true;
    if (!this.userForm.valid) {
      console.log('form not valid');
      this.toastMessageService.info('Please fill all required fields with valid values!');
      return;
    }
    if (!this.isLoggedIn()) {
      this.isLoading = true;
      const formBody = {
        fullName: this.userForm.value.fullName,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        confirmPassword: this.userForm.value.confirmPassword,
        phone: this.userForm.value.phone,
        gender: this.userForm.value.gender,
        goals: this.userForm.value.goals,
        age: this.userForm.value.age,
        height: this.userForm.value.height,
        weight: this.userForm.value.weight,
        loseOrGain: this.userForm.value.loseOrGain,
        goingGym: this.userForm.value.goingGym,
        foodType: this.userForm.value.foodType,
        medicalIssue: this.userForm.value.medicalIssue,
        foodAllergy: this.userForm.value.foodAllergy,
        planPrice: this.selectedPricingPlan.planPrice,
        payableTotal: this.onGetPayableTotal(),
        planName: this.selectedPricingPlan.planName,
        planDuration: this.userForm.value.planDuration,
      }
      const formObj = Object.assign({}, formBody, { domain: environment.domain, planUrl: this.router.url });
      this.userApiService.postRegisterUserAndPlaceOrder(formObj).subscribe((res: any) => {
        this.isLoading = false;
        // this.toastMessageService.success(res['message']);
        this.userId = res['userId'];
        this.razorPayOptions.key = res['key'];
        this.razorPayOptions.amount = res['value']['amount'];
        this.razorPayOptions.name = res['name'];
        this.razorPayOptions.order_id = res['orderId'];
        this.razorOrderId = res['orderId'];
        this.razorPayOptions.handler = this.razorPayResponseHandler.bind(this);
        let rzp1 = new Razorpay(this.razorPayOptions);
        rzp1.open();
        rzp1.on('payment.failed', (response: any) => {
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
        }
        );

      }, error => {
        this.isLoading = false
        if (error.status === 409 || error.statusText === "Conflict") {
          this.isConflictErr = true;
          this.emailInputValue = this.userForm.value.email;
          this.isLoading = false;
          if (this.isConflictErr) {
            this.showModel();
          }
        }
        else {
          this.isLoading = false;
          this.toastMessageService.error(error.error.message);
        }
      })
    }
    else {
      this.isLoading = true;
      const formBody = {
        goals: this.userForm.value.goals,
        email: this.userForm.value.email,
        age: this.userForm.value.age,
        height: this.userForm.value.height,
        weight: this.userForm.value.weight,
        loseOrGain: this.userForm.value.loseOrGain,
        goingGym: this.userForm.value.goingGym,
        foodType: this.userForm.value.foodType,
        medicalIssue: this.userForm.value.medicalIssue,
        foodAllergy: this.userForm.value.foodAllergy,
        payableTotal: this.onGetPayableTotal(),
        planPrice: this.selectedPricingPlan.planPrice,
        planName: this.selectedPricingPlan.planName,
        planDuration: this.userForm.value.planDuration,
      }
      const formObj = Object.assign({}, formBody, { domain: environment.domain, planUrl: this.router.url });
      console.log(formObj)
      this.userApiService.postPlaceOrder(formObj).subscribe((res: any) => {
        this.isLoading = false;
        this.userId = res['userId'];
        // this.toastMessageService.success(res['message']);
        this.razorPayOptions.key = res['key'];
        this.razorPayOptions.amount = res['value']['amount'];
        this.razorPayOptions.name = res['name'];
        this.razorPayOptions.order_id = res['orderId'];
        this.razorOrderId = res['orderId'];
        this.razorPayOptions.handler = this.razorPayResponseHandler.bind(this);
        let rzp1 = new Razorpay(this.razorPayOptions);
        rzp1.open(this.razorPayOptions);

      }, error => {
        this.isLoading = false;
        this.toastMessageService.error('An error occured with payment, please try again');
        console.log("error", error);
      })
    }

  }

  onGetPayableTotal() {
    // let totalPrice = 0;
    // switch (this.userForm.value.planDuration) {
    //   case ("1"):
    //     totalPrice = +(this.selectedPricingPlan['planPrice']) * +(this.userForm.value.planDuration);
    //     break;
    //   case ("3"):
    //     totalPrice = +(this.selectedPricingPlan['planPrice']) * 2;
    //     break;
    //   case ("6"):
    //     totalPrice = +(this.selectedPricingPlan['planPrice']) * +(this.userForm.value.planDuration / 2);
    //     break;
    // }
    // return totalPrice;
    let totalPrice = 0;
    switch (this.userForm.value.planDuration) {
      case ("15 days"):
        totalPrice = +(this.selectedPricingPlan['planPrice']);
        break;
      case ("30 days"):
        totalPrice = +(this.selectedPricingPlan['planPrice']);
        break;
      case ("90 days"):
        totalPrice = +(this.selectedPricingPlan['planPrice']);
        break;
    }
    return totalPrice;
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

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-model',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() component: any;
  @Input() emailInputValue: string;

  constructor(private userApiService: UserApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  errMsg: String = '';
  isShowPassword: boolean = false;
  isLoading: boolean = false;
  serverErrorMessages: string;

  orderDetails: any;

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userApiService.getUserOrder(params['orderId']).subscribe((res: any) => {
        this.orderDetails = res['order'][0];
        this.isLoading = false;

        const backdrop = document.getElementById('custom-order-backdrop') as HTMLElement;
        backdrop.style.visibility = 'visible';
        backdrop.style.opacity = '1';
        const model = document.getElementById('custom-order-modal') as HTMLElement;
        model.style.transform = 'translateY(0)';
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = "17px";
        // model.style.transform = 'scale(1)';
      }, err => {
        console.log(err);
        this.isLoading = false;
      })
    })
  }


  submitForm() {

  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  closeModal() {
    const backdrop = document.getElementById('custom-order-backdrop') as HTMLElement;
    backdrop.style.visibility = 'hidden';
    backdrop.style.opacity = '0';
    const model = document.getElementById('custom-order-modal') as HTMLElement;
    model.style.transform = 'translateY(100vh)';
    document.body.style.overflow = "auto";
    document.body.style.marginRight = "0";
    // model.style.transform = 'scale(0)';
    setTimeout(() => {
      this.router.navigate(['/account/profile/orders']);
    }, 300);
  }

  scrollToDiv() {
    const div = document.getElementById("plan-details") as HTMLElement;
    div.scrollIntoView();
  }
}

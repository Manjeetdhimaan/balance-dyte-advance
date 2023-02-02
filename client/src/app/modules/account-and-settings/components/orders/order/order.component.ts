import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-model',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() component:any;
  @Input() emailInputValue:string;

  constructor(private userApiService: UserApiService, private router: Router, private activatedRoute: ActivatedRoute) {}

  errMsg: String = '';
  isShowPassword: boolean = false;
  isLoading: boolean = false;
  serverErrorMessages: string;

  orderDetails: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userApiService.getUserOrder(params['orderId']).subscribe((res: any) => {
        this.orderDetails = res['order'][0];
        console.log(this.orderDetails)
      })
    })

    setTimeout(() => {
      const backdrop = document.getElementById('custom-order-backdrop') as HTMLElement;
      backdrop.style.visibility = 'visible';
      backdrop.style.opacity = '1';
      const model = document.getElementById('custom-order-modal') as HTMLElement;
      model.style.transform = 'translateY(0)'
    }, 0);
    
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
    setTimeout(() => {
      this.router.navigate(['/account/profile/orders']);
    }, 300);
  }

  scrollToDiv () {
    const div = document.getElementById("plan-details") as HTMLElement;
    div.scrollIntoView();
  }
}

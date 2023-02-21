import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { fallIn } from 'src/app/shared/common/animations';
import { Order } from 'src/app/shared/models/order.model';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor(private userApiService: UserApiService, private router: Router) { }

  isLoading: boolean = false;

  orders: Order[] = [];
  subscription: Subscription

  ngOnInit(): void {
    this.scrollTop();
    if (this.isLoggedIn()) {
      this.isLoading = true;
      // this.subscription = this.store.select('account').subscribe(stateStata => {
      //   if (stateStata.orders.length > 0) {
      //     this.orders = stateStata['orders'].slice().reverse();
      //     this.getTotalOfOrders();
      //     this.isLoading = false;
      //   }
      // });

        this.userApiService.getUserOrders().subscribe((res: any) => {
          // this.store.dispatch(new AccountActions.FetchOrders(res['orders']));
          this.orders = res['orders'].slice().reverse();
          this.getTotalOfOrders();
          this.isLoading = false;
        }, err => {
          // this.toastMessageService.info(err['error']['message']);
          this.isLoading = false;
          console.log(err);
        })
    }
  }

  isLoggedIn() {
    return this.userApiService.isLoggedIn();
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onNavigate(orderId: string) {
    this.router.navigate(['/account/profile/orders/view-order/' + orderId]);
  }

  getTotalOfOrders() {
    let totalAmount = 0;
    let totalDuration = 0;
    this.orders.map((el: any) => {
      totalAmount += Number(el['planDetails']['payableTotal']);
      totalDuration += Number(el['planDetails']['planDuration'].slice(0, 1));
    });
    return { totalAmount: totalAmount, totalDuration: totalDuration };
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

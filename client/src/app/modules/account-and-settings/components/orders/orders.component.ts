import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private userApiService: UserApiService, private toastMessageService: ToasTMessageService, private router: Router) { }

  isLoading: boolean = false;

  orders: any[] = [];

  ngOnInit(): void {
    this.scrollTop();
    if (this.isLoggedIn()) {
      this.isLoading = true;
      this.userApiService.getUserOrders().subscribe((res: any) => {
        this.orders = res['orders'].slice().reverse();
        this.getTotalOfOrders()
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
    return {totalAmount:totalAmount, totalDuration: totalDuration};
  }
}

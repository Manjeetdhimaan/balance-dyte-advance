import { Component, OnInit } from '@angular/core';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private userApiService: UserApiService, private toastMessageService: ToasTMessageService) { }

  isLoading: boolean = false;

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.userApiService.getUserOrders().subscribe((res: any) => {
        console.log(res)
        this.isLoading = false;
      }, err => {
        this.toastMessageService.error('An unknown error occured!');
        this.isLoading = false;
        console.log(err)
      })
    }
  }

  isLoggedIn() {
    return this.userApiService.isLoggedIn();
  }

}

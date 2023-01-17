import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToasTMessageService } from 'src/app/shared/services/toast-message.service';
import { UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor (private userApiService: UserApiService, private toastMessageService: ToasTMessageService, private activatedRoute: ActivatedRoute) {} 

  isLoading: boolean = false;

  order: any;

  ngOnInit(): void {
    console.log('order component')
    this.scrollTop();
    if (this.isLoggedIn()) {
      this.isLoading = true;
      this.activatedRoute.params.subscribe((param: Params) => {
        
        this.userApiService.getUserOrder(param['orderId']).subscribe((res: any) => {
          console.log(res);
          this.order = res['order'];
          this.isLoading = false;
        }, err => {
          this.toastMessageService.info(err['error']['message']);
          this.isLoading = false;
          console.log(err)
        })
      })
    }
  }

  isLoggedIn() {
    return this.userApiService.isLoggedIn();
  }

  scrollTop () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

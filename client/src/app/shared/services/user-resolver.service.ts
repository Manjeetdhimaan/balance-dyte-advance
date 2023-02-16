import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { User } from '../models/user.model';
import { UserApiService } from './user-api.service';

@Injectable({ providedIn: 'root' })
export class OrdersResolverService implements Resolve<User> {
  constructor(
    private userApiService: UserApiService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const orders:any = [];

    if (orders.length === 0) {
      return this.userApiService.getUserOrders().subscribe((res: any) => {
        return res.orders
      });
    } else {
      return orders;
    }
  }
}

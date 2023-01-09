import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from "@angular/router";
import { UserApiService } from '../services/user-api.service';


@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private userApiService : UserApiService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userApiService.isLoggedIn()) {
        this.router.navigateByUrl('/user/login');
        this.userApiService.deleteToken();
        return false;
      }
    return true;
  }
  
}

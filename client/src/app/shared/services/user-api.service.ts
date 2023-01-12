import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }
  
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  postRegisterUser(user: any){
    return this.http.post(environment.apiBaseUrl+'/user/register',user,this.noAuthHeader);
  }

  postLogin(authCredentials:any) {
    return this.http.post(environment.apiBaseUrl + '/user/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/user/getUserProfile');
  }

  postPlaceOrder(order:any) {
    return this.http.post(environment.apiBaseUrl + '/user/postPlaceOrder', order);
  }

  postUpdateUserProfile(userBody:any) {
    return this.http.patch(environment.apiBaseUrl + '/user/patchUpdateUserProfile', userBody);
  }

  getUserOrders() {
    return this.http.get(environment.apiBaseUrl + '/user/getUserOrders');
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}

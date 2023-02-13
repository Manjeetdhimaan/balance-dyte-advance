import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from "../../modules/register/store/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }
  
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  postRegisterUserAndPlaceOrder(user: any){
    return this.http.post(environment.apiBaseUrl+'/user/register-and-create-order',user,this.noAuthHeader);
  }
  postRegisterUser(user: any){
    return this.http.post(environment.apiBaseUrl+'/user/register-user',user,this.noAuthHeader);
  }

  postLogin(authCredentials:any) {
    return this.http.post(environment.apiBaseUrl + '/user/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/user/getUserProfile');
  }

  postPlaceOrder(order:any) {
    return this.http.post(environment.apiBaseUrl + '/user/postCreateOrder', order);
  }

  postContactForm(form:any) {
    return this.http.post(environment.apiBaseUrl + '/user/post-contact-form', form);
  }

  postAppointMentForm(form:any) {
    return this.http.post(environment.apiBaseUrl + '/user/postAppointMentForm', form);
  }

  postOrderResponse(order:any) {
    return this.http.post(environment.apiBaseUrl + '/user/postOrderResponse', order);
  }

  postUpdateUserProfile(userBody:any) {
    return this.http.patch(environment.apiBaseUrl + '/user/patchUpdateUserProfile', userBody);
  }

  getUserOrders() {
    return this.http.get(environment.apiBaseUrl + '/user/getUserOrders');
  }

  getUserOrder(orderId: string) {
    return this.http.get(environment.apiBaseUrl + '/user/getUserOrder/' + orderId);
  }

  putChangePassword(passwordBody:any) {
    return this.http.put(environment.apiBaseUrl + `/user/change-password`, passwordBody);
  }

  requestResetPassword(body:any) {
    return this.http.post(`${environment.apiBaseUrl}/user/req-reset-password`, body);
  }

  newPassword(body:any){
    return this.http.post(`${environment.apiBaseUrl}/user/new-password`, body);
  }

  validatePasswordToken(body:any) {
    return this.http.post(`${environment.apiBaseUrl}/user/valid-password-token`, body);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    this.store.dispatch(new AuthActions.UserLogout());
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PricingPlan } from '../models/pricing-plan.model';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanApiService {

  constructor(private http: HttpClient) { }
  baseUrl:string = environment.apiBaseUrl+'/plans';

  getPricingPlans(): Observable<PricingPlan[]> {
    return this.http.get<PricingPlan[]>(this.baseUrl + '/getPricingPlans');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsApiService {

  constructor(private http: HttpClient) { }
  baseUrl:string = environment.apiBaseUrl+'/testimonials';

  getTestimonials() {
    return this.http.get(this.baseUrl + '/gettestimonials');
  }
}

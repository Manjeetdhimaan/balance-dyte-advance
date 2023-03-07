import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl: string = environment.apiBaseUrl + '/blogs';
  blogs:any;

  constructor(private http: HttpClient) {
    this.http.get(this.baseUrl + '/get-blogs').subscribe((res:any) => {
      this.blogs = res.blogs;
    },
      error => {
        console.log(error);
      })
   }

  getStoredBlogs() {
    return this.blogs.slice();
  }

  getBlogsFromServer() {
    return this.http.get(this.baseUrl + '/get-blogs').toPromise();
  }

}

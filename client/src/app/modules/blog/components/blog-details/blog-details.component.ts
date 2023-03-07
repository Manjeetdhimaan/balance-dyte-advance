import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blogsArray: any[];
  isLoading: boolean = false;
  latestBlogs: any;
  moreBlogs: any;
  blog: any;
  subscription: Subscription;
  isError: boolean = false;
  constructor(private blogService: BlogService,
    private router: Router) {}

    ngOnInit(): void {
      this.isLoading = true;
      if(this.blogService.blogs) {
      const blogs = this.blogService.getStoredBlogs();
      this.blogService.getStoredBlogs().map((a: any) => {
        if (this.router.url.toLowerCase() == "/blogs/" + a.urlTitle.toLowerCase().split(' ').join('-')) {
          this.router.url.toLowerCase();
          this.blog = a;
          localStorage.setItem("blog", JSON.stringify(this.blog));
          // let blogs = this.blogService.blogsArray.slice(-10).reverse();
          // this.moreBlogs = blogs.sort(() => 0.5 - Math.random());
          this.latestBlogs = blogs.slice(-8).reverse();
          this.isLoading = false;
          this.isError = false;

          // this.latestBlogs = this.blogService.blogsArray.slice(-8).reverse();
        }
      })
      if (this.router.url.toLowerCase() !== "/blogs/" + this.blog?.urlTitle.toLowerCase().split(' ').join('-')) {
        this.router.navigate(['/404notfound']);
        this.isLoading = false;

      }
      this.isLoading = false;
      this.isError = false;
    }
      else {
      this.blogService.getBlogsFromServer().then((res: any) => {
        res.blogs.map((a: any) => {
          if (this.router.url.toLowerCase() == "/blogs/" + a.urlTitle.toLowerCase().split(' ').join('-')) {
            this.router.url.toLowerCase();
            this.blog = a;
            localStorage.setItem("blog", JSON.stringify(this.blog));
            // let blogs = this.blogService.blogsArray.slice(-10).reverse();
            // this.moreBlogs = blogs.sort(() => 0.5 - Math.random());
            this.latestBlogs = res.blogs.slice(-8).reverse();
            this.isLoading = false;
            this.isError = false;
            // this.latestBlogs = this.blogService.blogsArray.slice(-8).reverse();
          }
        })
        if (this.router.url.toLowerCase() !== "/blogs/" + this.blog?.urlTitle.toLowerCase().split(' ').join('-')) {
          this.router.navigate(['/404notfound']);
          this.isLoading = false;

        }
      }).catch((err: HttpErrorResponse) => {
        // this.toastService.error(err.message);
        this.isLoading = false;
        this.isError = true;
      })
    }
  }

  onNavigate(route:any) {
    window.scrollTo({
      behavior:'smooth',
      top:0
    });
    const selectedBlog = route.toLowerCase().split(' ').join('-');
    this.router.navigate(['/blogs/', selectedBlog]);
  }
}

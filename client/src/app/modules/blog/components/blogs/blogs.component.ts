import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs: any = [];
  isLoading: boolean = false;
  isError: boolean = false;

  constructor( private blogService: BlogService, private router: Router ) {}

  ngOnInit(): void {
    this.isLoading=true;
    if(this.blogService.blogs) {
      this.blogs = this.blogService.getStoredBlogs().slice(-4).reverse();
        this.isLoading = false;
        this.isError = false;
    }
    else {
      this.blogService.getBlogsFromServer().then((res:any) => {
        this.blogs = res.blogs.slice(-4).reverse();
        this.isLoading = false;
        this.isError = false;
      }).catch((err: any) => {
        console.log(err);
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

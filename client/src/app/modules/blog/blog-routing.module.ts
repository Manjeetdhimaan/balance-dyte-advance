import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogsComponent } from './components/blogs/blogs.component';


const routes: Routes = [
  {
    path: '', component: BlogsComponent, data: { title: 'Blogs' }
  },
  {
    path: ':name', component: BlogDetailsComponent, data: { title: 'Blogs Details', isBlog: 'Blogs' }
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

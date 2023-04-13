
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { fade } from './shared/common/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fade
  ]
})
export class AppComponent {
  rootTitle: string = "Balance Dyte"

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private metaService: Meta) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;

        const blogChild = this.activatedRoute.firstChild?.firstChild?.routeConfig?.data?.['isBlog'];

        if (blogChild) {
          if (child?.firstChild.snapshot.data['title']) {
            // const userJson = localStorage.getItem('blog');
            // let blog;
            // if (userJson !== null) {
            //   blog = JSON.parse(userJson);
            // }
            // child.snapshot.data['title'] = blog.title;
            // this.metaService.updateTag({ property: 'og:url', content: `https://www.balancedyte.com/${this.router.url.slice(1)}` });
            // this.metaService.updateTag({ property: 'title', content: blog.metaTitle });
            // this.metaService.updateTag({ property: 'description', content: blog.metaDesc });
            return child.snapshot.data['title'];
          }
        }
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;

          } else if (child.snapshot.data && child.snapshot.data['title']) {
            if (child.snapshot.data['isPlanDetalsComponent']) {
              let urlParams = ''
              child.params.subscribe((params: any) => {
                urlParams = params['planName'];
                this.metaService.updateTag({ property: 'og:url', content: `https://www.balancedyte.com/${urlParams}` });
              })
              urlParams = urlParams.split('-').join(' ');
              this.metaService.updateTag({ property: 'title', content: urlParams });
              this.metaService.updateTag({ property: 'description', content: urlParams });
              return this.capitalizeFirstLetter(urlParams);
            }
            return child.snapshot.data['title'];
          } else if (child.snapshot.data && child.snapshot.data['isPlanDetalsComponent']) {
            let urlParams = ''
            child.params.subscribe((params: any) => {
              urlParams = params['planName'];
              this.metaService.updateTag({ property: 'og:url', content: `https://www.balancedyte.com/${urlParams}` });
            })
            urlParams = urlParams.split('-').join(' ');
            this.metaService.updateTag({ property: 'title', content: urlParams });
            this.metaService.updateTag({ property: 'description', content: urlParams });
            return this.capitalizeFirstLetter(urlParams);
          } else {
            return ' ';
          }
        }
        return ' ';
      })
    ).subscribe((data: any) => {
      if (data && data.trim() != '') {
        this.titleService.setTitle(data + ` - ${this.rootTitle}`);
        // this.metaService.updateTag({ property: 'title', content: data });
            // this.metaService.updateTag({ property: 'description', content: data });
      }
      else {
        this.titleService.setTitle(`${this.rootTitle}`);
      }
    });
  }

  capitalizeFirstLetter(string: String) {
    // window.localStorage.setItem
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rootTitle: string = "Balance Dyte"

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;

          } else if (child.snapshot.data && child.snapshot.data['title']) {
            if (child.snapshot.data['isPlanDetalsComponent']) {
              let urlParams = ''
              child.params.subscribe((params: any) => {
                urlParams = params['planName']
              })
              urlParams = urlParams.split('-').join(' ');
              return this.capitalizeFirstLetter(urlParams);
            }
            return child.snapshot.data['title'];
          } else if (child.snapshot.data && child.snapshot.data['isPlanDetalsComponent']) {
            let urlParams = ''
            child.params.subscribe((params: any) => {
              urlParams = params['planName']
            })
            urlParams = urlParams.split('-').join(' ');
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

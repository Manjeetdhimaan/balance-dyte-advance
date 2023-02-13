import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { Subscription } from 'rxjs';
import { Testimonial } from 'src/app/shared/models/testimonials.model';
import { TestimonialsApiService } from 'src/app/shared/services/testimonials-api.service';
import { AppState } from 'src/app/store/app.reducer';
import * as RootCommonActions from "../../../../modules/root-common/store/root-common.actions";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit, OnDestroy {

  customOptionshome: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 3400,
    autoplaySpeed: 1500,
    autoplayHoverPause: false,
    autoplayMouseleaveTimeout: 3000,
    navSpeed: 4500,
    navText: ['<<', '>>'],
    responsive: {
      0: {
        "items": 1
      },
      480: {
        "items": 1
      },
      768: {
        "items": 1
      },
      992: {
        "items": 1
      },
      1200: {
        "items": 1,
      }
    },
  };

  // this testimonial array is just for reference;
  localTestimonials = [
    {
      "clientName": "Dalveer",
      "beforeImageSrc": "assets/images/testimonials/client-4.png",
      "clientProfession": "",
      "reviewTitle": "",
      "reviewContent": "Balance Dyte's diets are working for me quite well. The best thing about their eating routine is that I don't feel denied of anything. They are sans bother and possible and one doesn't need to make a special effort searching for fixings. I have likewise found it simple to follow while voyaging. Balance Dyte odology is extremely expert and that is the very thing that I like about them."
    },
    {
      "clientName": "Ashwini",
      "beforeImageSrc": "assets/images/testimonials/client-5.png",
      "clientProfession": "",
      "reviewTitle": "",
      "reviewContent": "In the present quick life ,we for the most part don't know about our wellbeing neither one of the we deal with it. Feed Me won't just make that awareness,but likewise will persuade you towards it.They will direct you with solid adjusted diet, alongside appropriate wellness system. Balance Dyte is an extraordinary influence....as they has been one in my life. Simply be consistent with yourself, work towards it and see the distinction."
    },
    {
      "clientName": "Jitendar",
      "beforeImageSrc": "assets/images/testimonials/client-6.png",
      "clientProfession": "",
      "reviewTitle": "",
      "reviewContent": "I lost 10 kgs with Balance Dyte in a range of 2 months 15 days. What I truly like is their disposition and uplifting perspective. They designs their diet plan around the things you like to eat and there are dependably choices :). Am as yet eating my chicken and paneer however the correct way. Truly on the off chance that you could get thinner yourself you have at this point, yet a little assistance from Balance Dyte will be sufficient to keep you fit and solid."
    }
  ]
  

  testimonialsArray:Testimonial[] = [ ];

  serverErrMsg: string;
  isLoading: boolean = false;
  subscription: Subscription;

  constructor (private testimonialsApiService: TestimonialsApiService, private store: Store<AppState>) { }

  ngOnInit() {
    this.serverErrMsg = '';
    this.isLoading = true;
    this.subscription = this.store.select('rootCommon').subscribe(stateData => {
      if (stateData.testimonials.length > 0) {
        this.testimonialsArray = stateData.testimonials;
        this.isLoading = false;
      }
    });

    if (this.testimonialsArray.length <= 0) {
      this.testimonialsApiService.getTestimonials().subscribe((res: any) => {
        // this.testimonialsArray = res['testimonials'];
        this.store.dispatch(new RootCommonActions.FetchTestimonials(res['testimonials']));
        this.isLoading = false;
      }, err => {
        this.serverErrMsg = "Error while fetching testimonials! Please try again"
        console.log(err);
        this.isLoading = false;
      })
    }
  };

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

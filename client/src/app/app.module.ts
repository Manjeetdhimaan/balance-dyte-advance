import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { PageNotFoundComponent } from './shared/components/ui-components/page-not-found/page-not-found.component';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ToastrModule.forRoot({
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      timeOut: 5000
    }),
    // StoreModule.forRoot(fromApp.appReducer, { metaReducers: [fromApp.clearState] })
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

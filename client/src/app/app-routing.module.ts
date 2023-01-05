import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/ui-components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/root-common/root-common.module').then(m => m.RootCommonModule),
    data: { animation: 'openClosePage' }
  },
  {
    path: 'not-found', component: PageNotFoundComponent, data: {title: 'Page Not Found'}
  },
  {
    path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

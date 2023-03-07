import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from './shared/auth/user-auth.guard';
import { PageNotFoundComponent } from './shared/components/ui-components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/root-common/root-common.module').then(m => m.RootCommonModule)
  },
  {
    path: 'user', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'account', loadChildren: () => import('./modules/account-and-settings/account-and-settings.module').then(m => m.AccountAndSettingsModule), canActivate: [UserAuthGuard]
  },
  {
    path: 'blogs', loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'not-found', component: PageNotFoundComponent, data: {title: 'Page Not Found'}
  },
  {
    path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

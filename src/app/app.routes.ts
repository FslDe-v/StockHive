import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { SignUpComponent } from './auth/sing-up/sing-up.component';
import { SignInComponent } from './auth/sing-in/sing-in.component';
import { FirstPageComponent } from './first-page/first-page.component';

export const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'home', component: HomeViewComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignUpComponent },
      { path: 'signin', component: SignInComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

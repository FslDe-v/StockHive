import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { SignUpComponent } from './auth/sing-up/sing-up.component';
import { SingInComponent } from './auth/sing-in/sing-in.component';
import { FirstPageComponent } from './first-page/first-page.component';

export const routes: Routes = [
  { path: '', component: FirstPageComponent }, // Route for the AuthComponent
  { path: 'home', component: HomeViewComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignUpComponent },
      { path: 'signin', component: SingInComponent },
    ],
  },
];

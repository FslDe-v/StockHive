import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { SignUpComponent } from './auth/sing-up/sing-up.component';
import { SingInComponent } from './auth/sing-in/sing-in.component';

export const routes: Routes = [
  { path: '', component: HomeViewComponent }, // Route for the AuthComponent
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignUpComponent },
      { path: 'signin', component: SingInComponent },
    ],
  },
];

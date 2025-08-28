import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SignupComponent } from './signup/signup';
import { LoginComponent } from './login/login';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  {path: 'home', component: Home},
  {path: '', component: Home},
  { path: 'signup', component: SignupComponent },
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: Dashboard}

];

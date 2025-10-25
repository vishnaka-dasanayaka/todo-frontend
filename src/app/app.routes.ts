import { Routes } from '@angular/router';
import { Signin } from './pages/signin/signin';
import { Signup } from './pages/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';
import { Verify } from './pages/verify/verify';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: Signin },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: Dashboard },
  { path: 'verify', component: Verify },
  { path: '**', redirectTo: '/signin' },
];

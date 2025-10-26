import { Routes } from '@angular/router';
import { Signin } from './pages/signin/signin';
import { Signup } from './pages/signup/signup';
import { Verify } from './pages/verify/verify';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from '../app/guards/auth.guard';
import { VerifyGuard } from '../app/guards/verify.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
  },

  {
    path: 'verify',
    component: Verify,
    canActivate: [VerifyGuard],
  },

  { path: 'signin', component: Signin },
  { path: 'signup', component: Signup },
  { path: '**', redirectTo: '/signin' },
];

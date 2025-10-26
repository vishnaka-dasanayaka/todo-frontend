// verify.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VerifyGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const pendingVerification = localStorage.getItem(
      'pendingVerificationemail'
    );

    if (pendingVerification) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}

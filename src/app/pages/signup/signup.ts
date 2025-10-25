import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true,
})
export class Signup {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  passwordMismatch = false;

  constructor(private router: Router) {}

  async onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: this.user.email,
        password: this.user.password,
        options: {
          userAttributes: {
            email: this.user.email,
          },
          autoSignIn: {
            enabled: true,
          },
        },
      });
      // this.toastr.success(
      //   'Sign-up successful! Check your email for confirmation.',
      //   'Done'
      // );
      localStorage.setItem('email', this.user.email);
      this.router.navigate(['/verify']);
    } catch (err: any) {
      // this.toastr.error(err.message || 'Sign-up failed', 'Error');
      // console.error('Cognito sign-up error:', err);
    } finally {
      // this.loading = false;
    }

    // localStorage.setItem('isLoggedIn', 'true');
    // localStorage.setItem('userEmail', this.user.email);
    // localStorage.setItem('userName', this.user.name);

    // this.router.navigate(['/dashboard']);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signUp } from 'aws-amplify/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true,
})
export class Signup {
  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  passwordMismatch = false;

  loading: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) {}

  async onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    try {
      this.loading = true;
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: this.user.email,
        password: this.user.password,
        options: {
          userAttributes: {
            email: this.user.email,
            given_name: this.user.firstname,
            family_name: this.user.lastname,
          },
          autoSignIn: {
            enabled: true,
          },
        },
      });
      this.toastr.success('', '', {
        toastClass: 'small-toast',
        positionClass: 'toast-top-right',
        timeOut: 3000,
        tapToDismiss: true,
        progressBar: false,
        closeButton: false,
      });
      this.loading = false;
      localStorage.setItem('pendingVerificationemail', this.user.email);
      this.router.navigate(['/verify']);
    } catch (err: any) {
      this.loading = false;
      this.toastr.error('', '', {
        toastClass: 'small-toast-err',
        positionClass: 'toast-top-right',
        timeOut: 3000,
        tapToDismiss: true,
        progressBar: false,
        closeButton: false,
      });
    } finally {
      this.loading = false;
    }
  }
}

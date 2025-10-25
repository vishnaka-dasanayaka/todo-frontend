import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn } from 'aws-amplify/auth';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
  standalone: true,
})
export class Signin {
  credentials = {
    email: '',
    password: '',
  };

  constructor(private router: Router) {}

  async onSubmit() {
    try {
      console.log(this.credentials);

      await signIn({
        username: this.credentials.email,
        password: this.credentials.password,
      });

      // this.toastr.success('Sign-in successful', 'Done');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      // this.toastr.error('Sign-in failed', 'Error');
      // this.loading = false;
    }

    // Navigate to dashboard
  }
}

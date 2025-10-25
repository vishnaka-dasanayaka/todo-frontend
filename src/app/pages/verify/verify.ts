import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  autoSignIn,
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  resendSignUpCode,
} from 'aws-amplify/auth';

@Component({
  selector: 'app-verify',
  imports: [CommonModule, FormsModule],
  templateUrl: './verify.html',
  styleUrl: './verify.css',
  standalone: true,
})
export class Verify {
  credentials = {
    code: '',
  };

  email: any;

  constructor(private router: Router) {
    this.email = localStorage.getItem('email');
  }

  async onSubmit() {
    try {
      const { nextStep: confirmSignUpNextStep } = await confirmSignUp({
        username: this.email,
        confirmationCode: this.credentials.code,
      });

      if (confirmSignUpNextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
        const { nextStep } = await autoSignIn();

        if (nextStep.signInStep === 'DONE') {
          try {
            // await this.userService.addUser().subscribe();
            // this.toastr.success('Successfully signed in', 'Tada');

            // await this.addRole();

            this.router.navigate(['/dashboard']);
          } catch (userAddError) {
            console.error('Error adding user:', userAddError);
            // this.toastr.warning(
            //   'Signed in, but failed to register user',
            //   'Tada'
            // );
          }
        }
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      // this.toastr.error(error.message || 'Verification failed', 'Tada');
    } finally {
      // this.loading = false;
    }
  }
}

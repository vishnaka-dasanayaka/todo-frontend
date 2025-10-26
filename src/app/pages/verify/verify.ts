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
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './verify.html',
  styleUrl: './verify.css',
  standalone: true,
  providers: [UserService],
})
export class Verify {
  credentials = {
    code: '',
  };

  loading: boolean = false;

  email: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.email = localStorage.getItem('pendingVerificationemail');
  }

  async onSubmit() {
    try {
      this.loading = true;
      const { nextStep: confirmSignUpNextStep } = await confirmSignUp({
        username: this.email,
        confirmationCode: this.credentials.code,
      });

      if (confirmSignUpNextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
        const { nextStep } = await autoSignIn();

        if (nextStep.signInStep === 'DONE') {
          try {
            this.userService.createUser({}).subscribe((data) => {
              this.loading = false;
              this.router.navigate(['/dashboard']);
            });

            this.toastr.error('', '', {
              toastClass: 'small-toast',
              positionClass: 'toast-top-right',
              timeOut: 3000,
              tapToDismiss: true,
              progressBar: false,
              closeButton: false,
            });
          } catch (userAddError) {
            this.loading = false;
            console.error('Error adding user:', userAddError);
            this.toastr.error('', '', {
              toastClass: 'small-toast-err',
              positionClass: 'toast-top-right',
              timeOut: 3000,
              tapToDismiss: true,
              progressBar: false,
              closeButton: false,
            });
          }
        }
      }
    } catch (error: any) {
      console.error('Verification error:', error);
    } finally {
      this.loading = false;
    }
  }
}

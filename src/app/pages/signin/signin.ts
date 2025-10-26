import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn, signOut } from 'aws-amplify/auth';
import { ToastrService } from 'ngx-toastr';

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

  private isBrowser: boolean;

  loading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit() {
    if (this.isBrowser) {
      await signOut();
    }
  }

  async onSubmit() {
    try {
      this.loading = true;
      await signIn({
        username: this.credentials.email,
        password: this.credentials.password,
      });

      this.loading = false;

      // this.toastr.success('Sign-in successful', 'Done');
      this.router.navigate(['/dashboard']);
    } catch (error) {
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

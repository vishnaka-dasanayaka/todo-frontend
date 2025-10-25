import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  onSubmit() {
    // Store user session (in a real app, validate with backend)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', this.credentials.email);

    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }
}

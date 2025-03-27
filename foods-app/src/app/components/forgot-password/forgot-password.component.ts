import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordRequest, ApiErrorResponse } from '../../models/auth.dtos';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [HomeNavComponent, CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  email = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    const request: ForgotPasswordRequest = { email: this.email };

    this.authService.forgotPassword(request).subscribe({
      next: (res) => {
        this.authService.sendEmail(
          res.email,
          'Password Reset Code',
          `Your reset code is: ${res.resetCode}`
        ).subscribe(() => this.router.navigate(['/reset-password']));
      },
      error: (err: ApiErrorResponse) => {
        this.errorMessage = err.detail || 'Failed to process request. Please try again.';
      }
    });
  }
}
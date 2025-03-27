import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordRequest, ApiErrorResponse } from '../../models/auth.dtos';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [HomeNavComponent, CommonModule, FormsModule],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  email = '';
  code = '';
  newPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    const request: ResetPasswordRequest = {
      email: this.email,
      code: this.code,
      newPassword: this.newPassword
    };

    this.authService.resetPassword(request).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err: ApiErrorResponse) => {
        this.errorMessage = err.detail || 'Password reset failed. Please try again.';
      }
    });
  }
}
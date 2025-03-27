import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChangePasswordRequest, ApiErrorResponse } from '../../models/auth.dtos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileNavComponent } from '../profile-nav/profile-nav.component';

@Component({
  standalone: true,
  imports: [ProfileNavComponent, CommonModule, FormsModule],
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  oldPassword = '';
  newPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    const request: ChangePasswordRequest = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    this.authService.changePassword(request).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err: ApiErrorResponse) => {
        this.errorMessage = err.detail || 'Password change failed. Please try again.';
      }
    });
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest, ApiErrorResponse } from '../../models/auth.dtos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeNavComponent } from '../home-nav/home-nav.component';

@Component({
  standalone: true,
  imports: [HomeNavComponent, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    const request: RegisterRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.register(request).subscribe({
      next: (res) => {
        this.authService.sendEmail(
          res.email, 
          'Verification Code', 
          `Your verification code is: ${res.verificationCode}`
        ).subscribe(() => {
          this.router.navigate(['/verify-email'], { state: { email: this.email } });
        });
      },
      error: (err: ApiErrorResponse) => {
        this.errorMessage = err.detail || 'Registration failed. Please try again.';
      }
    });
  }
}
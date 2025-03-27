import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VerifyEmailRequest, ApiErrorResponse, VerificationResponse } from '../../models/auth.dtos';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  code: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  canResend: boolean = true;
  countdown: number = 0;
  showEmail: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    
    if (state && state['email']) {
      this.email = state['email'];
      this.showEmail = true;
    } else {
      const historyState = window.history.state;
      if (historyState && historyState['email']) {
        this.email = historyState['email'];
        this.showEmail = true;
      }
    }
  }

  onSubmit() {
    if (!this.code) {
      this.errorMessage = 'Please enter the verification code';
      return;
    }

    if (!this.email) {
      this.errorMessage = 'No email available for verification';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    const request: VerifyEmailRequest = {
      email: this.email,
      code: this.code
    };

    this.authService.verifyEmail(request).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/profile'], { 
          state: { message: 'Email verified successfully!' } 
        });
      },
      error: (err: ApiErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = err.detail || 'Verification failed. Please check the code and try again.';
      }
    });
  }

  resendCode() {
    if (!this.canResend || !this.email) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.canResend = false;
    this.countdown = 30;
    
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.canResend = true;
      }
    }, 1000);

    this.authService.resendVerificationCode(this.email).subscribe({
      next: (res) => {
        this.authService.sendEmail(
          res.email,
          'New Verification Code',
          `Your new verification code is: ${res.verificationCode}`
        ).subscribe({
          next: () => {
            this.isLoading = false;
            this.successMessage = 'New verification code sent to your email!';
          },
          error: (emailErr) => {
            this.isLoading = false;
            this.errorMessage = 'Failed to send email. Please try again later.';
          }
        });
      },
      error: (err: ApiErrorResponse) => {
        this.isLoading = false;
        this.canResend = true;
        clearInterval(interval);
        this.errorMessage = err.detail || 'Failed to generate new code. Please try again.';
      }
    });
  }
}
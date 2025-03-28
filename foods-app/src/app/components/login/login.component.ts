import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest, ApiErrorResponse } from '../../models/auth.dtos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: "app-login",
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @Output() success = new EventEmitter<void>();
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    const request: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(request).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.success.emit();
        
        // Redirect based on role
        this.authService.validateToken().subscribe({
          next: (response) => {
            if (response.role === 'Admin') {
              this.router.navigate(['/admin']);
            } else if (response.role === 'Chef') {
              this.router.navigate(['/chef']);
            } else {
              this.router.navigate(['/profile']);
            }
          },
          error: () => this.router.navigate(['/profile'])
        });
      },
      error: (err: ApiErrorResponse) => {
        this.errorMessage = err.detail || 'Login failed. Please try again.';
      }
    });
  }
}
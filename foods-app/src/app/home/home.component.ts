import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { CommonModule } from '@angular/common';
import { HomeNavComponent } from '../components/home-nav/home-nav.component';
import { AuthService } from '../services/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, LoginComponent, HomeNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showLogin = false;
  isLoading = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.isLoading = false;
      return;
    }

    this.authService.validateToken().pipe(
      catchError(() => {
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(response => {
      this.isLoading = false;
      if (response?.isValid) {
        if (response.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'Chef') {
          this.router.navigate(['/chef']);
        } else {
          this.router.navigate(['/profile']);
        }
      }
    });
  }

  onLoginSuccess() {
    this.showLogin = false;
    // The actual navigation is now handled in LoginComponent
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword() {
    this.showLogin = false;
    this.router.navigate(['/forgot-password']);
  }
}
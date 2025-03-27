import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeNavComponent } from '../home-nav/home-nav.component';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [HomeNavComponent,CommonModule, RouterLink],
  template: `
<app-home-nav></app-home-nav>
    <div class="unauthorized-container">
      <div class="error-card">
        <h1>403 - Access Denied</h1>
        <p>You don't have permission to view this page.</p>
        <div class="error-details">
          <p>Please contact your administrator if you believe this is an error.</p>
        </div>
        <a routerLink="/profile" class="home-link">Return to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .error-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 500px;
      width: 100%;
    }
    h1 {
      color: #d32f2f;
      margin-bottom: 1rem;
    }
    .error-details {
      margin: 1.5rem 0;
      color: #666;
    }
    .home-link {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #1976d2;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .home-link:hover {
      background-color: #1565c0;
    }
  `]
})
export class UnauthorizedComponent {}
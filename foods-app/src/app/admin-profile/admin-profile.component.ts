import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  template: `
    <div class="admin-content">
      <h2>Admin Dashboard</h2>
      <p>Special admin features and controls</p>
      <!-- Add admin-specific content here -->
    </div>
  `,
  styles: [`
    .admin-content {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 5px;
    }
  `]
})
export class AdminProfileComponent {}
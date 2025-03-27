import { Component } from '@angular/core';

@Component({
  selector: 'app-chef-profile',
  standalone: true,
  template: `
    <div class="chef-content">
      <h2>Chef Workspace</h2>
      <p>Menu management and order tracking</p>
      <!-- Add chef-specific content here -->
    </div>
  `,
  styles: [`
    .chef-content {
      background-color: #fff8e1;
      padding: 20px;
      border-radius: 5px;
    }
  `]
})
export class ChefProfileComponent {}
// admin-profile.component.ts
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    RouterOutlet
  ],
  template: `
    <div class="admin-container">
      <mat-toolbar color="primary">
        <span>Admin Console</span>
      </mat-toolbar>

      <div class="admin-content">
        <mat-sidenav-container>
          <mat-sidenav mode="side" opened>
            <mat-nav-list>
              <a mat-list-item routerLink="ingredients" routerLinkActive="active">
                <mat-icon>kitchen</mat-icon> Ingredients
              </a>
              <a mat-list-item routerLink="meals" routerLinkActive="active">
                <mat-icon>restaurant</mat-icon> Meals
              </a>
              <a mat-list-item routerLink="feedback" routerLinkActive="active">
                <mat-icon>feedback</mat-icon> Feedback
              </a>
            </mat-nav-list>
          </mat-sidenav>

          <mat-sidenav-content>
            <router-outlet></router-outlet>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .admin-content {
      flex: 1;
      overflow: auto;
    }
    mat-sidenav-container {
      height: 100%;
    }
    mat-sidenav {
      width: 250px;
      background: #f5f5f5;
    }
    .active {
      background-color: #e0e0e0;
    }
  `]
})
export class AdminProfileComponent {}
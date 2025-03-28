// admin-profile.component.ts
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProfileNavComponent } from '../../components/profile-nav/profile-nav.component';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    ProfileNavComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    RouterOutlet
  ],
  template: `
  <app-profile-nav></app-profile-nav>

    <div class="admin-container">
   
    

      <div class="admin-content">
        <mat-sidenav-container>
          <mat-sidenav mode="side" opened>
            <mat-nav-list>
              <a mat-list-item routerLink="/admin/ingredients" routerLinkActive="active">
                <mat-icon>kitchen</mat-icon> Ingredients
              </a>
              <a mat-list-item routerLink="/admin/meals" routerLinkActive="active">
                <mat-icon>restaurant</mat-icon> Meals
              </a>
              <a mat-list-item routerLink="/admin/feedback" routerLinkActive="active">
                <mat-icon>feedback</mat-icon> Feedback
              </a>
<a mat-list-item routerLink="/admin/users" routerLinkActive="active">
  <mat-icon>people</mat-icon> Users
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
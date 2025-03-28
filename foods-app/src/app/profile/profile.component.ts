import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileNavComponent } from '../components/profile-nav/profile-nav.component';
import { AdminProfileComponent } from '../admin/admin-profile/admin-profile.component';
import { ChefProfileComponent } from '../chef-profile/chef-profile.component';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';
import { ClientMenuComponent } from '../client-menu/client-menu.component';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [
    CommonModule, 
    ProfileNavComponent,
    AdminProfileComponent,
    ChefProfileComponent,
    ClientMenuComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  successMessage = '';
  userRole$!: Observable<string>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.successMessage = navigation?.extras.state?.['message'] || '';
  }

  ngOnInit() {
    this.userRole$ = this.authService.validateToken().pipe(
      map(response => {
        console.log('User role:', response.role);
        // Redirect admin users to admin dashboard
        if (response.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'Chef') {
          this.router.navigate(['/chef']);
        }
        return response.role;
      })
    );
  }
}
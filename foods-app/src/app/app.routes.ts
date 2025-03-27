import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ChefProfileComponent } from './chef-profile/chef-profile.component';

export const routes: Routes = [
   { 
    path: '', 
    component: HomeComponent,  
  },
  
  // Authentication routes (public)
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
  // Protected routes
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  
  // Role-specific routes
  {
    path: 'admin',
    component: AdminProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Admin' }
  },
  {
    path: 'chef',
    component: ChefProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Chef' }
  },
  
  // System routes
  { path: 'unauthorized', component: UnauthorizedComponent },
  
  // Default route - redirects based on auth status
  { 
    path: '', 
    canActivate: [AuthGuard],
    data: { redirectToProfile: true },
    children: [] // Empty children just to trigger the guard
  },
  
  // Fallback route (should be last)
  { path: '**', redirectTo: '/home' }
]
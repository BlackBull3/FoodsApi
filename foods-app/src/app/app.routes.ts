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
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { ChefProfileComponent } from './chef-profile/chef-profile.component';
import { IngredientsComponent } from './admin/ingredients/ingredients.component';
import { MealsComponent } from './admin/meals/meals.component';
import { FeedbackComponent } from './admin/feedback/feedback.component';
import { adminRoutes } from './admin/admin.routes';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

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
  
  // Admin routes
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Admin' },
    children: adminRoutes
  },
  
  // Chef route
  {
    path: 'chef',
    component: ChefProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Chef' }
  },
  
  // System routes
  { path: 'unauthorized', component: UnauthorizedComponent },
  
  // Fallback route
  { path: '**', redirectTo: '' }
];
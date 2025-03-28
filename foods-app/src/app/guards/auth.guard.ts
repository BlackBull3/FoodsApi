import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    
    return this.authService.validateToken().pipe(
      tap(response => {
        // Skip redirection for specific routes
        if (state.url.startsWith('/admin') || state.url.startsWith('/chef') || state.url === '/profile') {
          return;
        }
        
        // Role-based redirection
        if (response.isValid) {
          if (response.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (response.role === 'Chef') {
            this.router.navigate(['/chef']);
          }
        }
      }),
      map(response => response.isValid),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
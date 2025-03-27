import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data['expectedRole'];
    
    if (!expectedRole) {
      console.error('No expectedRole defined in route data');
      this.router.navigate(['/unauthorized']);
      return of(false);
    }

    return this.authService.validateToken().pipe(
      map(response => {
        if (response.isValid && response.role === expectedRole) {
          return true;
        }
        this.router.navigate(['/unauthorized']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/home']); // Redirect to home on error
        return of(false);
      })
    );
  }
}
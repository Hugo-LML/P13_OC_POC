import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private userService = inject(UserService);

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.userService.getCurrentUser(); // Get the currently logged-in user

    if (currentUser) {
      const expectedRole = route.data['role']; // Get the required role for the route from route data
      if (currentUser.name.toLowerCase() === expectedRole) { // Check if the current user's role matches the required role
        return true; // Allow access if roles match
      } else {
        this.router.navigate(['/']); // Redirect to home if roles do not match
        return false; // Deny access
      }
    }

    this.router.navigate(['/']); // Redirect to home if no user is logged in
    return false; // Deny access
  }
}
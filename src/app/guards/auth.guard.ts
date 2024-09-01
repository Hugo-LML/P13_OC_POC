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
    const currentUser = this.userService.getCurrentUser();

    if (currentUser) {
      const expectedRole = route.data['role'];
      if (currentUser.name.toLowerCase() === expectedRole) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}
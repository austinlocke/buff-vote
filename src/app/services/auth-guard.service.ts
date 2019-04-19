import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    // Check if user is logged in, if not redirect them to login page
    if (this.auth.isLoggedIn()) {
      if (!this.auth.getUserDetails().verified &&
          (next.data.path !== "/verify-email") &&
          (next.data.path !== "/verify-email/:token")) {
        this.router.navigate(['/verify-email']);
      }
      return true;
    } else {
      if ((next.data.path === "/verify-email/:token")) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }
  }
}

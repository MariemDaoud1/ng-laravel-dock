import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// Update the import path if necessary, and ensure the Auth service is exported as 'Auth' in the referenced file.
import { Auth } from '../auth/auth'; // Update this path if your Auth service is located elsewhere

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(route: unknown, state: unknown): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

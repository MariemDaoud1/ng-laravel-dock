import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],  // Provide the guard
      // Also provide any dependencies AuthGuard needs here (e.g., AuthService)
    });
    guard = TestBed.inject(AuthGuard);  // Inject the guard instance
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when user is authenticated', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result: boolean | Promise<boolean> | { subscribe: (fn: (value: boolean) => void) => any } = guard.canActivate(route, state);

    // If canActivate returns boolean or Observable/Promise<boolean>, handle accordingly:
    if (typeof result === 'object' && result !== null) {
      if ('then' in result && typeof (result as Promise<boolean>).then === 'function') {
        // Handle Promise
        return (result as Promise<boolean>).then(value => expect(value).toBeTrue());
      } else if ('subscribe' in result && typeof (result as any).subscribe === 'function') {
        // Handle Observable
        return (result as any).subscribe((value: boolean) => expect(value).toBeTrue());
      }
    } else {
      expect(result).toBeTrue();
    }
  });
});

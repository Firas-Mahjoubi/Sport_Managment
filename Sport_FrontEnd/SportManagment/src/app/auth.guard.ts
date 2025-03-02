import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export function authGuard(): Observable<boolean> | boolean {
  const router = inject(Router);
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage

  if (!userRole) {
    router.navigate(['/']);
    return false; // User is not logged in
  }

  return true; // Allow access if user has a role
}

export function roleGuard(allowedRoles: string[]) {
  return () => {
    const router = inject(Router);
    const userRole = localStorage.getItem('userRole');

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  };
}

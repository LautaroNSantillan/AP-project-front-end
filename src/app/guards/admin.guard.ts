import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const roles = this.tokenService.getAuthorities();
    if (roles.includes('ADMIN')) {
      return true;
    } else {
      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }
  }
}
  

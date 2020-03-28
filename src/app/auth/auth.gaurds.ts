import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGaurd implements CanActivate {

  constructor(
    private aurhService: AuthService,
    private router: Router ) {}
  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot): boolean | Observable<boolean> {
    const isAuth = this.aurhService.getAuthStatusFirst();
    if (!isAuth) {
      this.router.navigate(['/']);
    }

    return isAuth ;



  }
}

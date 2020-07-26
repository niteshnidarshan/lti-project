import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckAuthGuradService implements CanActivate{

  constructor(private authService: AuthenticationService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    //implement guard logic
    //Check if user is logged in
    if(this.authService.isUserLoggedIn()){
      return true;
    }
    else{
      //should navigate to login page
      this.route.navigate(['/login']);
      return false;
    }
  }
}

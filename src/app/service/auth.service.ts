import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { DocumentSessionStorage } from '../models/session-storage-model';

const defaultPath = '/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {  // const defaultPath = '/';
  constructor(private router: Router, private http: HttpClient) { 

    
  }

  get loggedIn(): boolean {
    let token = DocumentSessionStorage.token;
    return token != null;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  login(emailId: string, password: string) {
    if (emailId == "mamatapal12@gmail.com" && password == "Mamata@123") {
      DocumentSessionStorage.token = "SFKJR88738423FKSDJFKSJ";
      this.router.navigate(['/dashboard']);
    }
    else {
      sessionStorage.removeItem('token');
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const isLoggedIn = this.authService.loggedIn;

    // if (!isLoggedIn) {
    //   this.router.navigate(['/']);
    // }

    // return isLoggedIn;
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      // this.router.navigate(['/landing-page']);
      this.router.navigate(['/login']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}

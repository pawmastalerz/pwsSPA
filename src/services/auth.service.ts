import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = new BehaviorSubject<boolean>(false);
  castIsAuth = this.isAuth.asObservable();

  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private router: Router) {}

  editIsAuth(isAuth: boolean) {
    this.isAuth.next(isAuth);
    console.log('Obecna wartosc isAuth: ' + this.isAuth.value);
  }

  login(username: string, password: string) {
    return this.http
      .post(this.baseUrl + 'users/login', { username, password })
      .subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('accessToken', res.token);
        this.decodedToken = this.jwtHelper.decodeToken(res.token);
        if (this.isAuthenticated) {
          this.isAuth.next(true);
          this.router.navigateByUrl('/admin');
        } else {
          console.log('nieprawidłowe hasło');
        }
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/login');
  }

  getDecodedToken() {
    return this.decodedToken();
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  public isAuthenticated(): boolean {
    if (!this.jwtHelper.isTokenExpired(localStorage.getItem('accessToken'))) {
      this.isAuth.next(true);
      return true;
    }
    this.logout();
    return false;
  }
}

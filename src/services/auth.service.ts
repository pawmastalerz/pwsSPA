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
        this.router.navigateByUrl('/admin');
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/news');
  }

  getDecodedToken() {
    return this.decodedToken();
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('accessToken'));
  }
}

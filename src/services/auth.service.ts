import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private router: Router) {}

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
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('accessToken'));
  }
}

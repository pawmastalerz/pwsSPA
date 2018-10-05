import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { User } from '../Models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<User>(this.baseUrl + 'users/login', { username, password })
      .subscribe(res => {
        localStorage.setItem('accessToken', res.token);
        this.decodedToken = this.jwtHelper.decodeToken(res.token);
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('accessToken'));
  }
}

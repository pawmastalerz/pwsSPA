import { Poster } from './../Models/Poster';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
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
      .post<User>(this.baseUrl + 'users/authenticate', { username, password })
      .subscribe(res => {
        // console.log(res);
        localStorage.setItem('accessToken', res.token);
        this.decodedToken = this.jwtHelper.decodeToken(res.token);
        console.log(this.decodedToken);
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  getPosters(): Observable<Poster[]> {
    return this.http.get<Poster[]>(this.baseUrl + 'posters');
  }
}

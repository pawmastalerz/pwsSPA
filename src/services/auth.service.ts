import { Poster } from './../Models/Poster';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return (
      this.http
        .post<User>(this.baseUrl + 'users/authenticate', { username, password })
        // this is just the HTTP call,
        // we still need to handle the reception of the token
        // .shareReplay()
    );
  }

  getPosters(): Observable<Poster[]> {
    return this.http.get<Poster[]>(this.baseUrl + 'posters');
  }
}

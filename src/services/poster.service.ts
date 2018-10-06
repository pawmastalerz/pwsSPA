import { Poster } from './../Models/Poster';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNewsPosters(): Observable<Poster[]> {
    return this.http.get<Poster[]>(this.baseUrl + 'posters');
  }
}

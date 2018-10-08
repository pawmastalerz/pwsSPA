import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadPoster(file) {
    return this.http.post(this.baseUrl + 'posters/upload', file, {
      observe: 'response'
    });
  }

  getNewsPosters() {
    return this.http.get(this.baseUrl + 'posters/news', {
      observe: 'response'
    });
  }

  getAllPosters() {
    return this.http.get(this.baseUrl + 'posters/all', {
      observe: 'response'
    });
  }
}

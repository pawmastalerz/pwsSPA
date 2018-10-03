import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPosters() {
    return this.http.get(this.baseUrl + 'posters').subscribe(response => {
      console.log(response);
    });
}
}

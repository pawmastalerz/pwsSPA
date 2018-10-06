import { Poster } from './../Models/Poster';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PosterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNewsPosters() {
    return this.http.get(this.baseUrl + 'posters', {observe: 'response'});
  }
}

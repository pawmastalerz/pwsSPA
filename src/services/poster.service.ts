import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createPoster(
    description: string,
    happensAt: Date,
    visible: number,
    file: any
  ) {
    return this.http
      .post(this.baseUrl + 'posters/create', {
        description,
        happensAt,
        visible,
        file
      })
      .subscribe((res: any) => {
        console.log(res);
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

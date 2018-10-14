import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PosterService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createPoster(form: any) {
    return this.http
      .post(this.baseUrl + 'posters/create', form, {
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

  deletePoster(id: number) {
    return this.http.delete(this.baseUrl + 'posters/' + id, {
      observe: 'response'
    });
  }
}

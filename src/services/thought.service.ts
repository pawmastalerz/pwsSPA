import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createThought(form: any) {
    return this.http.post(this.baseUrl + 'thoughts/create', form, {
      observe: 'response'
    });
  }

  getNewsThoughts() {
    return this.http.get(this.baseUrl + 'thoughts/news', {
      observe: 'response'
    });
  }

  getAllThoughts() {
    return this.http.get(this.baseUrl + 'thoughts/all', {
      observe: 'response'
    });
  }

  getThought(id: number) {
    return this.http.get(this.baseUrl + 'thoughts/' + id, {
      observe: 'response'
    });
  }

  updateThought(form: any) {
    return this.http.put(this.baseUrl + 'thoughts/update', form, {
      observe: 'response'
    });
  }

  deleteThought(id: number) {
    return this.http.delete(this.baseUrl + 'thoughts/' + id, {
      observe: 'response'
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createEvent(form: any) {
    return this.http.post(this.baseUrl + 'events/create', form, {
      observe: 'response'
    });
  }

  getNewsEvents() {
    return this.http.get(this.baseUrl + 'events/news', {
      observe: 'response'
    });
  }

  getAllEvents() {
    return this.http.get(this.baseUrl + 'events/all', {
      observe: 'response'
    });
  }

  getEvent(id: number) {
    return this.http.get(this.baseUrl + 'events/' + id, {
      observe: 'response'
    });
  }

  updateEvent(form: any) {
    return this.http.put(this.baseUrl + 'events/update', form, {
      observe: 'response'
    });
  }

  deleteEvent(id: number) {
    return this.http.delete(this.baseUrl + 'events/' + id, {
      observe: 'response'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Event } from 'src/models/Event';
import { environment } from 'src/environments/environment';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-shared-news-posters',
  templateUrl: './shared-news-posters.component.html',
  styleUrls: ['./shared-news-posters.component.scss']
})
export class SharedNewsPostersComponent implements OnInit {

  events: Event[];
  rootUrl = environment.rootUrl;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadPosters();
  }

  loadPosters() {
    this.eventService.getNewsEvents().subscribe((res: any) => {
      this.events = res.body;
      // console.log(+res.status);
    }, error => {
      console.log(error);
    });
  }

}

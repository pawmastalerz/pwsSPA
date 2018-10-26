import { Component, OnInit } from '@angular/core';
import { Poster } from 'src/models/Poster';
import { environment } from 'src/environments/environment';
import { PosterService } from 'src/services/poster.service';

@Component({
  selector: 'app-shared-news-posters',
  templateUrl: './shared-news-posters.component.html',
  styleUrls: ['./shared-news-posters.component.scss']
})
export class SharedNewsPostersComponent implements OnInit {

  posters: Poster[];
  rootUrl = environment.rootUrl;

  constructor(private posterService: PosterService) {}

  ngOnInit() {
    this.loadPosters();
  }

  loadPosters() {
    this.posterService.getNewsPosters().subscribe((res: any) => {
      this.posters = res.body;
      // console.log(+res.status);
    }, error => {
      console.log(error);
    });
  }

}

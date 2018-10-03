import { PosterService } from './../services/poster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(
    private posterService: PosterService
  ) { }

  ngOnInit() {
    this.posterService.getPosters();
  }

}

import { Component, OnInit } from '@angular/core';
import { PosterService } from '../../../services/poster.service';
import { Poster } from '../../../Models/Poster';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss']
})
export class PostersComponent implements OnInit {
  posters: Poster[];

  constructor(private posterService: PosterService) {}

  ngOnInit() {
    this.loadPosters();
  }

  loadPosters() {
    this.posterService.getPosters().subscribe( (posters: Poster[]) => {
        this.posters = posters;
        console.log('Wczytuję plakaty w posters component...');
        console.log(this.posters);
      },
      error => {
        console.log(error);
      }
    );
  }
}
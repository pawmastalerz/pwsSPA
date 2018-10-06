import { Component, OnInit } from '@angular/core';
import { PosterService } from '../../../services/poster.service';
import { Poster } from '../../../models/Poster';

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
    this.posterService.getNewsPosters().subscribe((res: any) => {
      this.posters = res.body;
      // console.log(+res.status);
    }, error => {
      console.log(error);
    });
  }
}

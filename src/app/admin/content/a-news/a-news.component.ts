import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PosterService } from '../../../../services/poster.service';
import { Poster } from '../../../../Models/Poster';

@Component({
  selector: 'app-a-news',
  templateUrl: './a-news.component.html',
  styleUrls: ['./a-news.component.scss']
})
export class ANewsComponent implements OnInit {
  postersList: Poster[];

  constructor(
    private authService: AuthService,
    private posterService: PosterService
  ) { }

  ngOnInit() {
    this.loadPosters();
  }

  loadPosters() {
    if (this.authService.isAuthenticated) {
      this.posterService.getAllPosters().subscribe((res: any) => {
          this.postersList = res.body;
          console.log(this.postersList);
          // console.log(+res.status);
        }, error => {
          console.log(error);
        });
    }
  }
}

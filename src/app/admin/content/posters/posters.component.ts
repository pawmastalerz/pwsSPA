import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PosterService } from '../../../../services/poster.service';
import { Poster } from '../../../../Models/Poster';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss']
})
export class PostersComponent implements OnInit {
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

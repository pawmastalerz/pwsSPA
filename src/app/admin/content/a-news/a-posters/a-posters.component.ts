import { Component, OnInit } from '@angular/core';
import { Poster } from '../../../../../Models/Poster';
import { AuthService } from '../../../../../services/auth.service';
import { PosterService } from '../../../../../services/poster.service';

@Component({
  selector: 'app-a-posters',
  templateUrl: './a-posters.component.html',
  styleUrls: ['./a-posters.component.scss']
})
export class APostersComponent implements OnInit {
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

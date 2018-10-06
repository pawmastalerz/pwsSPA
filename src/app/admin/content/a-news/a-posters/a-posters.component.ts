import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { PosterService } from '../../../../../services/poster.service';
import * as moment from 'moment';

@Component({
  selector: 'app-a-posters',
  templateUrl: './a-posters.component.html',
  styleUrls: ['./a-posters.component.scss']
})
export class APostersComponent implements OnInit {
  settings = {
    columns: {
      description: {
        title: 'Opis'
      },
      happensAt: {
        title: 'Data',
        valuePrepareFunction: value => {
          const formatted = moment(value).format('DD-MM-YYYY HH:mm');

          return formatted;
        }
      },
      posterPhotoUrl: {
        title: 'Zdjęcie'
      }
    }
  };

  data: any;

  constructor(
    private authService: AuthService,
    private posterService: PosterService
  ) {}

  ngOnInit() {
    this.loadPosters();
  }

  loadPosters() {
    if (this.authService.isAuthenticated) {
      this.posterService.getAllPosters().subscribe(
        (res: any) => {
          this.data = res.body;
          console.log(this.data);
          // console.log(+res.status);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}

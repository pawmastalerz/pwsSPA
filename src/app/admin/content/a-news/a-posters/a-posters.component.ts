import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { PosterService } from '../../../../../services/poster.service';
import * as moment from 'moment';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-a-posters',
  templateUrl: './a-posters.component.html',
  styleUrls: ['./a-posters.component.scss']
})
export class APostersComponent implements OnInit {
  public progress: number;
  public message: string;
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
    private posterService: PosterService,
    private http: HttpClient
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

  upload(files) {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    for (const file of files) {
      formData.append(file.name, file);
    }

    const uploadReq = new HttpRequest('POST', `http://localhost:5000/api/posters/upload`, formData);

    this.http.request(uploadReq).subscribe();
}
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { PosterService } from '../../../../../services/poster.service';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-a-posters',
  templateUrl: './a-posters.component.html',
  styleUrls: ['./a-posters.component.scss']
})
export class APostersComponent implements OnInit {

  posterForm = new FormGroup({
    description: new FormControl('', Validators.required),
    happensAt: new FormControl('', Validators.required)
  });

  posterToSend: any;

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

  onSubmit() {
    console.log('Tworzę nowy plakat...');
  }

  pick(files) {
    if (files.length !== 1) {
      return;
    }

    const formData = new FormData();

    for (const file of files) {
      formData.append(file.name, file);
    }

    this.posterToSend = formData;
  }

  upload() {
    this.posterService.uploadPoster(this.posterToSend).subscribe(
      (res: any) => {
        console.log(+res.status);
      },
      error => {
        console.log(error);
      }
    );
  }
}

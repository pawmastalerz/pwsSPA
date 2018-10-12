import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PosterService } from 'src/services/poster.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-a-posters',
  templateUrl: './a-posters.component.html',
  styleUrls: ['./a-posters.component.scss']
})
export class APostersComponent implements OnInit {
  posterForm = new FormGroup({
    description: new FormControl('', Validators.required),
    happensAt: new FormControl('', Validators.required),
    visible: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required)
  });

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
      visible: {
        title: 'Widoczność',
        valuePrepareFunction: value => {
          return value === 1 ? 'Widoczny' : 'Ukryty';
        }
      }
    }
  };

  data: any;

  constructor(
    private posterService: PosterService,
    private authService: AuthService
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
    this.posterService.createPoster(
      this.posterForm.value.description,
      this.posterForm.value.happensAt,
      this.posterForm.value.visible,
      this.posterForm.value.file
    );
  }
}

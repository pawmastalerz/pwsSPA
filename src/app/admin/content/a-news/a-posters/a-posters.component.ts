import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    happensAt: new FormControl('', Validators.required),
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
      }
    }
  };

  data: any;

  constructor(
    private authService: AuthService,
    private posterService: PosterService,
    private cd: ChangeDetectorRef
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

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.posterForm.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        console.log(this.posterForm.value);
      };
    }
  }

  onSubmit() {
    console.log('Tworzę nowy plakat...');
  }
}

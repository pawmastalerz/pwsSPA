import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PosterService } from 'src/services/poster.service';
import { AuthService } from 'src/services/auth.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-a-posters',
  templateUrl: './a-posters.component.html',
  styleUrls: ['./a-posters.component.scss']
})
export class APostersComponent implements OnInit {
  posterForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    happensAt: new FormControl('', Validators.required),
    visible: new FormControl(''),
    image: new FormControl('', Validators.required)
  });

  formData = new FormData();

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
    },
    mode: 'external',
    actions: {
      add: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="fa fa-search"></i>'
        }
      ]
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>'
    },
    delete: { deleteButtonContent: '<i class="fa fa-trash"></i>' },
    filter: { inputClass: 'happensAt' },
    noDataMessage: 'Nie znaleziono żadnych danych w bazie'
  };

  source: LocalDataSource;

  constructor(
    private posterService: PosterService,
    private authService: AuthService
  ) {
    this.source = new LocalDataSource();
    this.loadPosters();
  }

  ngOnInit() {}

  loadPosters() {
    if (this.authService.isAuthenticated) {
      this.posterService.getAllPosters().subscribe(
        (res: any) => {
          this.source.load(res.body);
          console.log(this.source);
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

    for (const file of files) {
      this.formData.append(file.name, file);
      console.log(file);
    }
  }

  onSubmit() {
    this.formData.set('description', this.posterForm.value.description);
    this.formData.set('happensAt', this.posterForm.value.happensAt);
    this.formData.set('visible', this.posterForm.value.visible);

    this.posterService.createPoster(this.formData).subscribe(
      (res: any) => {
        console.log(res);
        this.loadPosters();
      },
      error => {
        console.log(error);
      }
    );
    this.posterForm.reset();
  }

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  }

  onEdit(event) {
    alert(`Edytuję plakat o id ${event.data.id}`);
  }

  onDelete(event) {
    this.posterService.deletePoster(Number(`${event.data.id}`)).subscribe(
      (res: any) => {
        console.log(res);
        this.loadPosters();
      },
      error => {
        console.log(error);
      }
    );
  }
}

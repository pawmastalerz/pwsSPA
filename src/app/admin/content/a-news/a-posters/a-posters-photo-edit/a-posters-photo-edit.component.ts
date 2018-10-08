import { Component, OnInit } from '@angular/core';
import { PosterService } from 'src/services/poster.service';

@Component({
  selector: 'app-a-posters-photo-edit',
  templateUrl: './a-posters-photo-edit.component.html',
  styleUrls: ['./a-posters-photo-edit.component.scss']
})
export class APostersPhotoEditComponent implements OnInit {
  posterToSend: any;

  constructor(
    private posterService: PosterService
  ) { }

  ngOnInit() {
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

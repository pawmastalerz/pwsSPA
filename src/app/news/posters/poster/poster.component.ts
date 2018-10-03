import { Component, OnInit, Input } from '@angular/core';
import { Poster } from '../../../../Models/poster';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {
  @Input()
  posterDetails: Poster;

  constructor() {}

  ngOnInit() {
    console.log('Wczytuję plakat w poster component...');
    console.log(this.posterDetails.posterPhotoUrl);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-news-thoughts',
  templateUrl: './shared-news-thoughts.component.html',
  styleUrls: ['./shared-news-thoughts.component.scss']
})
export class SharedNewsThoughtsComponent implements OnInit {
  images = [
    '../../../../assets/carousel/slider1.jpg',
    '../../../../assets/carousel/slider2.jpg',
    '../../../../assets/carousel/slider3.jpg'
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 6000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {}

}

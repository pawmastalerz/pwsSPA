import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-carousel',
  templateUrl: './news-carousel.component.html',
  styleUrls: ['./news-carousel.component.scss']
})
export class NewsCarouselComponent implements OnInit {
  images = [
    '../../../assets/carousel-image.jpg',
    '../../../assets/carousel-image.jpg',
    '../../../assets/carousel-image.jpg'
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

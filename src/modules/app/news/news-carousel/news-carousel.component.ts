import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-carousel',
  templateUrl: './news-carousel.component.html',
  styleUrls: ['./news-carousel.component.scss']
})
export class NewsCarouselComponent implements OnInit {
  images = [
    '../../../assets/carousel/slider1.jpg',
    '../../../assets/carousel/slider2.jpg',
    '../../../assets/carousel/slider3.jpg',
    '../../../assets/carousel/slider4.jpg',
    '../../../assets/carousel/slider5.jpg',
    '../../../assets/carousel/slider6.jpg',
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

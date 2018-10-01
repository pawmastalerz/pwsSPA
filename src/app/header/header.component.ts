import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerL = '../../assets/header/headerL.png';
  headerC = '../../assets/header/headerC.png';
  headerR = '../../assets/header/headerR.png';

  headerTemp = '../../assets/header/headerBackground.png';
  constructor() {}

  ngOnInit() {}
}

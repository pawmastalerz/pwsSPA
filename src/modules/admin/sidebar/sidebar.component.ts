import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  items: NbMenuItem[] = [
    {
      title: 'Raport',
      link: '/admin/glowna'
    },
    {
      title: 'Wydarzenia',
      link: '/admin/wydarzenia'
    },
    {
      title: 'Myśli',
      link: '/admin/mysli'
    }
  ];

  constructor() {}

  ngOnInit() {}
}

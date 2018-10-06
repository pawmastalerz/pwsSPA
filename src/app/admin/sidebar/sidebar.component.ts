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
      title: 'Strona główna',
      link: '/admin/home'
    },
    {
      title: 'Plakaty',
      link: '/admin/posters'
    },
    {
      title: 'Posty',
      link: '/admin/posts'
    }
  ];

  constructor() {}

  ngOnInit() {}
}

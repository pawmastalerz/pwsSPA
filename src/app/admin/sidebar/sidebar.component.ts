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
      title: 'Panel administracyjny',
      link: '/admin/home'
    },
    {
      title: 'Aktualności',
      link: '/admin/news'
    }
  ];

  constructor() {}

  ngOnInit() {}
}

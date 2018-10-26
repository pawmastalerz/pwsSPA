import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private sidebarService: NbSidebarService
    ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.authService.editIsAuth(false);
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}

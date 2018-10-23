import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;
  nav = '../../assets/navbar/nav.jpg';

  public isCollapsed = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.castIsAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }
}

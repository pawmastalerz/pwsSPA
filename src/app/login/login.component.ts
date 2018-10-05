import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAuth: boolean;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.castIsAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }

  onSubmit() {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
  }
}

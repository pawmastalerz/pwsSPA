import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((res) => {
        console.log('User is logged in. Server response');
        console.log(res);
        // this.router.navigateByUrl('/');
      });
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);
  }
}

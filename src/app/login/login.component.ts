import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http
      .post('http://localhost:5000/api/auth/login', credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .subscribe(
        response => {
          const token = (<any>response).token;
          localStorage.setItem('jwt', token);
          this.invalidLogin = false;
        },
        err => {
          this.invalidLogin = true;
        }
      );
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThoughtService } from 'src/services/thought.service';
import { AuthService } from 'src/services/auth.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Thought } from 'src/models/Thought';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-a-thoughts',
  templateUrl: './a-thoughts.component.html',
  styleUrls: ['./a-thoughts.component.scss']
})
export class AThoughtsComponent implements OnInit {

  createThoughtForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    visible: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });
  createThoughtFormData = new FormData();
  constructor() {}

  ngOnInit() {}
}

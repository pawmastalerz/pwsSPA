import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  selectedThought: Thought;
  previewThoughtUrl = '';
  rootUrl = environment.rootUrl;

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

  source: LocalDataSource;

  constructor(
    private thoughtService: ThoughtService,
    private authService: AuthService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService
  ) {}

  onSelectThoughtFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewThoughtUrl = String(reader.result);
      };

      this.createThoughtFormData = new FormData();
      this.createThoughtFormData.append(file.name, file);
    }
  }

  onThoughtCreateSubmit() {
    this.createThoughtFormData.set(
      'description',
      this.createThoughtForm.value.description
    );
    this.createThoughtFormData.set(
      'happensAt',
      this.createThoughtForm.value.happensAt
    );
    this.createThoughtFormData.set(
      'visible',
      this.createThoughtForm.value.visible
    );

    this.thoughtService.createThought(this.createThoughtFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertifyService.success(
            'Utworzono plakat "' + this.createThoughtForm.value.description + '"'
          );
        } else {
          this.alertifyService.error(
            'Błąd przy tworzeniu plakatu "' +
              this.createThoughtForm.value.description +
              '"'
          );
        }
        this.loadThoughts();
        this.createThoughtForm.reset();
        this.createThoughtFormData = new FormData();
        this.previewThoughtUrl = '';
      },
      error => {
        console.log(error);
        this.alertifyService.error(
          'Błąd przy tworzeniu plakatu "' +
            this.createThoughtForm.value.description +
            '"'
        );
        this.createThoughtForm.reset();
        this.createThoughtFormData = new FormData();
        this.previewThoughtUrl = '';
      }
    );
  }

  ngOnInit() {}

  loadThoughts() {
    if (this.authService.isAuthenticated) {
      this.thoughtService.getAllThoughts().subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.source.load(res.body);
          } else {
            this.alertifyService.error('Błąd podczas ładowania listy plakatów');
          }
        },
        error => {
          console.log(error);
          this.alertifyService.error('Błąd podczas ładowania listy plakatów');
        }
      );
    }
  }
}

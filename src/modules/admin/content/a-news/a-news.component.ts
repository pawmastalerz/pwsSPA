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
  selector: 'app-a-news',
  templateUrl: './a-news.component.html',
  styleUrls: ['./a-news.component.scss']
})
export class ANewsComponent implements OnInit {
  @ViewChild('deleteThoughtModal')
  deleteThoughtModal: ElementRef;

  rootUrl = environment.rootUrl;

  selectedThought: Thought;
  previewCreateThoughtUrl = '';
  previewEditThoughtUrl = '';
  showThoughtDetails = false;
  showThoughtsOnSite = true;

  createThoughtForm = new FormGroup({
    quote: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]),
    author: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    accepted: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });
  createThoughtFormData = new FormData();

  editThoughtForm = new FormGroup({
    quote: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]),
    author: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    accepted: new FormControl('', Validators.required),
    image: new FormControl('')
  });
  editThoughtFormData = new FormData();

  settings = {
    columns: {
      quote: {
        title: 'Cytat'
      },
      author: {
        title: 'Autor'
      },
      accepted: {
        title: 'Akceptacja',
        valuePrepareFunction: value => {
          return value === 1 ? 'Przyjęto' : 'Oczekuje';
        }
      }
    },
    mode: 'external',
    actions: {
      columnTitle: 'Akcje',
      add: false
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>'
    },
    delete: { deleteButtonContent: '<i class="fa fa-trash"></i>' },
    noDataMessage: 'Nie znaleziono żadnych myśli w bazie'
  };

  source: LocalDataSource;

  constructor(
    private thoughtService: ThoughtService,
    private authService: AuthService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService
  ) {
    this.source = new LocalDataSource();
    this.loadThoughts();
  }

  ngOnInit() {}

  loadThoughts() {
    if (this.authService.isAuthenticated) {
      this.thoughtService.getAllThoughts().subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.source.load(res.body);
          } else {
            this.alertifyService.error('Błąd podczas ładowania listy myśli');
          }
          this.showThoughtsOnSite = false;
          setTimeout(() => {
            this.showThoughtsOnSite = true;
          }, 300);
        },
        error => {
          console.log(error);
          this.alertifyService.error('Błąd podczas ładowania listy myśli');
          this.showThoughtsOnSite = false;
          setTimeout(() => {
            this.showThoughtsOnSite = true;
          }, 300);
        }
      );
    }
  }

  // New thought

  onSelectThoughtFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewCreateThoughtUrl = String(reader.result);
      };

      this.createThoughtFormData = new FormData();
      this.createThoughtFormData.append(file.name, file);
    }
  }

  onThoughtCreateSubmit() {
    this.createThoughtFormData.set('quote', this.createThoughtForm.value.quote);
    this.createThoughtFormData.set(
      'author',
      this.createThoughtForm.value.author
    );
    this.createThoughtFormData.set(
      'accepted',
      this.createThoughtForm.value.accepted
    );

    this.thoughtService.createThought(this.createThoughtFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertifyService.success('Utworzono myśl');
        } else {
          this.alertifyService.error('Błąd przy tworzeniu myśli');
        }
        this.loadThoughts();
        this.createThoughtForm.reset();
        this.createThoughtFormData = new FormData();
        this.previewCreateThoughtUrl = '';
      },
      error => {
        console.log(error);
        this.alertifyService.error('Błąd przy tworzeniu myśli');
        this.createThoughtForm.reset();
        this.createThoughtFormData = new FormData();
        this.previewCreateThoughtUrl = '';
      }
    );
  }

  // Table

  onEditThought(event) {
    this.alertifyService.message('Ładuję...');
    this.thoughtService
      .getThought(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedThought = res.body;
        this.editThoughtForm.setValue({
          quote: this.selectedThought.quote,
          author: this.selectedThought.author,
          accepted:
            this.selectedThought.accepted === 1 ? 'Przyjęto' : 'Oczekuje',
          image: null
        });
        this.previewEditThoughtUrl =
          this.rootUrl + this.selectedThought.thoughtPhotoUrl;
        this.showThoughtDetails = true;
      });
  }

  onSelectEditThoughtFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewEditThoughtUrl = String(reader.result);
      };

      this.editThoughtFormData = new FormData();
      this.editThoughtFormData.append(file.name, file);
      console.log(this.editThoughtFormData);
    }
  }

  onThoughtEditSubmit() {
    this.editThoughtFormData.set('id', this.selectedThought.id.toString());
    this.editThoughtFormData.set('quote', this.editThoughtForm.value.quote);
    this.editThoughtFormData.set('author', this.editThoughtForm.value.author);
    this.editThoughtFormData.set(
      'accepted',
      this.editThoughtForm.value.accepted
    );

    this.thoughtService.updateThought(this.editThoughtFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.loadThoughts();
          this.alertifyService.success('Zaktualizowano myśl');
        } else {
          this.alertifyService.error('Błąd przy aktualizacji myśli');
        }
        this.editThoughtForm.reset();
        this.editThoughtFormData = new FormData();
      },
      error => {
        console.log(error);
        this.alertifyService.error('Błąd przy aktualizacji myśli');
        this.editThoughtForm.reset();
        this.editThoughtFormData = new FormData();
      }
    );
  }

  closeThoughtDetails() {
    this.showThoughtDetails = false;
  }

  onDeleteThoughtModal(event) {
    this.thoughtService
      .getThought(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedThought = res.body;
        this.modalService.open(this.deleteThoughtModal, {
          centered: true
        });
      });
  }

  onDeleteThought() {
    this.thoughtService
      .deleteThought(Number(this.selectedThought.id))
      .subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.alertifyService.error('Usunięto myśl');
          } else {
            this.alertifyService.error('Błąd przy usuwaniu myśli');
          }
          this.loadThoughts();
        },
        error => {
          console.log(error);
          this.alertifyService.error('Błąd przy usuwaniu myśli');
        }
      );
  }
}

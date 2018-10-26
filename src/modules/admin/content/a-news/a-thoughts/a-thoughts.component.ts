import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PosterService } from 'src/services/poster.service';
import { AuthService } from 'src/services/auth.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Poster } from 'src/models/Poster';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-a-thoughts',
  templateUrl: './a-thoughts.component.html',
  styleUrls: ['./a-thoughts.component.scss']
})
export class AThoughtsComponent implements OnInit {
  @ViewChild('deletePosterModal')
  deletePosterModal: ElementRef;

  rootUrl = environment.rootUrl;

  selectedPoster: Poster;
  previewCreatePosterUrl = '';
  previewEditPosterUrl = '';
  showPosterDetails = false;

  createPosterForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    happensAt: new FormControl('', Validators.required),
    accepted: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });
  createPosterFormData = new FormData();

  editPosterForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    happensAt: new FormControl('', Validators.required),
    accepted: new FormControl('', Validators.required),
    image: new FormControl('')
  });
  editPosterFormData = new FormData();

  settings = {
    columns: {
      description: {
        title: 'Opis'
      },
      happensAt: {
        title: 'Data',
        valuePrepareFunction: value => {
          const formatted = moment(value).format('DD-MM-YYYY');
          return formatted;
        }
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
    filter: { inputClass: 'happensAt' },
    noDataMessage: 'Nie znaleziono żadnych plakatów w bazie'
  };

  source: LocalDataSource;

  constructor(
    private posterService: PosterService,
    private authService: AuthService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService
  ) {
    this.source = new LocalDataSource();
    this.loadPosters();
  }

  ngOnInit() {}

  loadPosters() {
    if (this.authService.isAuthenticated) {
      this.posterService.getAllPosters().subscribe(
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

  // New poster

  onSelectPosterFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewCreatePosterUrl = String(reader.result);
      };

      this.createPosterFormData = new FormData();
      this.createPosterFormData.append(file.name, file);
    }
  }

  onPosterCreateSubmit() {
    this.createPosterFormData.set(
      'description',
      this.createPosterForm.value.description
    );
    this.createPosterFormData.set(
      'happensAt',
      this.createPosterForm.value.happensAt
    );
    this.createPosterFormData.set(
      'accepted',
      this.createPosterForm.value.accepted
    );

    this.posterService.createPoster(this.createPosterFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertifyService.success(
            'Utworzono plakat "' + this.createPosterForm.value.description + '"'
          );
        } else {
          this.alertifyService.error(
            'Błąd przy tworzeniu plakatu "' +
              this.createPosterForm.value.description +
              '"'
          );
        }
        this.loadPosters();
        this.createPosterForm.reset();
        this.createPosterFormData = new FormData();
        this.previewCreatePosterUrl = '';
      },
      error => {
        console.log(error);
        this.alertifyService.error(
          'Błąd przy tworzeniu plakatu "' +
            this.createPosterForm.value.description +
            '"'
        );
        this.createPosterForm.reset();
        this.createPosterFormData = new FormData();
        this.previewCreatePosterUrl = '';
      }
    );
  }

  // Table

  onEditPoster(event) {
    this.alertifyService.message('Ładuję...');
    this.posterService
      .getPoster(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedPoster = res.body;
        this.editPosterForm.setValue({
          description: this.selectedPoster.description,
          happensAt: this.selectedPoster.happensAt,
          accepted: this.selectedPoster.accepted === 1 ? 'Przyjęto' : 'Oczekuje',
          image: null
        });
        this.previewEditPosterUrl =
          this.rootUrl + this.selectedPoster.posterPhotoUrl;
        this.showPosterDetails = true;
      });
  }

  onSelectEditPosterFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewEditPosterUrl = String(reader.result);
      };

      this.editPosterFormData = new FormData();
      this.editPosterFormData.append(file.name, file);
      console.log(this.editPosterFormData);
    }
  }

  onPosterEditSubmit() {
    this.editPosterFormData.set('id', this.selectedPoster.id.toString());
    this.editPosterFormData.set(
      'description',
      this.editPosterForm.value.description
    );
    this.editPosterFormData.set(
      'happensAt',
      this.editPosterForm.value.happensAt
    );
    this.editPosterFormData.set('accepted', this.editPosterForm.value.accepted);

    this.posterService.updatePoster(this.editPosterFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.loadPosters();
          this.alertifyService.success(
            'Zaktualizowano plakat "' +
              this.editPosterForm.value.description +
              '"'
          );
        } else {
          this.alertifyService.error(
            'Błąd przy aktualizacji plakatu "' +
              this.editPosterForm.value.description +
              '"'
          );
        }
        this.editPosterForm.reset();
        this.editPosterFormData = new FormData();
      },
      error => {
        console.log(error);
        this.alertifyService.error(
          'Błąd przy aktualizacji plakatu "' +
            this.editPosterForm.value.description +
            '"'
        );
        this.editPosterForm.reset();
        this.editPosterFormData = new FormData();
      }
    );
  }

  closePosterDetails() {
    this.showPosterDetails = false;
  }

  onDeletePosterModal(event) {
    this.posterService
      .getPoster(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedPoster = res.body;
        this.modalService.open(this.deletePosterModal, {
          centered: true
        });
      });
  }

  onDeletePoster() {
    this.posterService.deletePoster(Number(this.selectedPoster.id)).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertifyService.error(
            'Usunięto plakat "' + this.selectedPoster.description + '"'
          );
        } else {
          this.alertifyService.error(
            'Błąd przy usuwaniu plakatu "' +
              this.selectedPoster.description +
              '"'
          );
        }
        this.loadPosters();
      },
      error => {
        console.log(error);
        this.alertifyService.error(
          'Błąd przy usuwaniu plakatu "' + this.selectedPoster.description + '"'
        );
      }
    );
  }
}

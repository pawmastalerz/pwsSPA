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
  selector: 'app-a-posters',
  templateUrl: './a-posters.component.html',
  styleUrls: ['./a-posters.component.scss']
})
export class APostersComponent implements OnInit {
  @ViewChild('deletePosterModal')
  deletePosterModal: ElementRef;
  @ViewChild('previewPosterModal')
  previewPosterModal: ElementRef;
  @ViewChild('editPosterModal')
  editPosterModal: ElementRef;

  selectedPoster: Poster;
  previewPosterUrl = '';
  rootUrl = environment.rootUrl;

  createPosterForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    happensAt: new FormControl('', Validators.required),
    visible: new FormControl('', Validators.required),
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
    visible: new FormControl('', Validators.required),
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
      visible: {
        title: 'Widoczność',
        valuePrepareFunction: value => {
          return value === 1 ? 'Widoczny' : 'Ukryty';
        }
      }
    },
    mode: 'external',
    actions: {
      columnTitle: 'Akcje',
      add: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="fa fa-search"></i>'
        }
      ]
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
        this.previewPosterUrl = String(reader.result);
      };

      this.createPosterFormData = new FormData();
      this.createPosterFormData.append(file.name, file);
    }
  }

  onPosterCreateSubmit() {
    this.createPosterFormData.set('description', this.createPosterForm.value.description);
    this.createPosterFormData.set('happensAt', this.createPosterForm.value.happensAt);
    this.createPosterFormData.set('visible', this.createPosterForm.value.visible);

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
        this.previewPosterUrl = '';
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
        this.previewPosterUrl = '';
      }
    );
  }

  // Table

  onEditPosterModal(event) {
    this.alertifyService.message('Ładuję...');
    this.posterService
      .getPoster(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedPoster = res.body;
        this.editPosterForm.setValue({
          description: this.selectedPoster.description,
          happensAt: this.selectedPoster.happensAt,
          visible: this.selectedPoster.visible === 1 ? 'Widoczny' : 'Ukryty',
          image: null
        });
        this.modalService.open(this.editPosterModal, {
          centered: true
        });
      });
  }

  onSelectEditPosterFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      this.editPosterFormData = new FormData();
      this.editPosterFormData.append(file.name, file);
      console.log(this.editPosterFormData);
    }
  }

  onPosterEditSubmit() {
    this.editPosterFormData.set('id', this.selectedPoster.id.toString());
    this.editPosterFormData.set('description', this.editPosterForm.value.description);
    this.editPosterFormData.set('happensAt', this.editPosterForm.value.happensAt);
    this.editPosterFormData.set('visible', this.editPosterForm.value.visible);

    this.posterService.updatePoster(this.editPosterFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.loadPosters();
          this.alertifyService.success(
            'Zaktualizowano plakat "' + this.editPosterForm.value.description + '"'
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

  onPreviewPosterModal(event) {
    this.posterService
      .getPoster(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedPoster = res.body;
        this.modalService.open(this.previewPosterModal, {
          centered: true
        });
      });
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

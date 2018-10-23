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
  @ViewChild('deleteModal')
  deleteModal: ElementRef;
  @ViewChild('previewModal')
  previewModal: ElementRef;
  @ViewChild('editModal')
  editModal: ElementRef;

  selectedPoster: Poster;
  previewUrl = '';
  rootUrl = environment.rootUrl;

  createForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    happensAt: new FormControl('', Validators.required),
    visible: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });
  createFormData = new FormData();

  editForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]),
    happensAt: new FormControl('', Validators.required),
    visible: new FormControl('', Validators.required),
    image: new FormControl('')
  });
  editFormData = new FormData();

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
    noDataMessage: 'Nie znaleziono żadnych danych w bazie'
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

  onSelectFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewUrl = String(reader.result);
      };

      this.createFormData = new FormData();
      this.createFormData.append(file.name, file);
    }
  }

  onSubmit() {
    this.createFormData.set('description', this.createForm.value.description);
    this.createFormData.set('happensAt', this.createForm.value.happensAt);
    this.createFormData.set('visible', this.createForm.value.visible);

    this.posterService.createPoster(this.createFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertifyService.success(
            'Utworzono plakat "' + this.createForm.value.description + '"'
          );
        } else {
          this.alertifyService.error(
            'Błąd przy tworzeniu plakatu "' +
              this.createForm.value.description +
              '"'
          );
        }
        this.loadPosters();
        this.createForm.reset();
        this.createFormData = new FormData();
        this.previewUrl = '';
      },
      error => {
        console.log(error);
        this.alertifyService.error(
          'Błąd przy tworzeniu plakatu "' +
            this.createForm.value.description +
            '"'
        );
        this.createForm.reset();
        this.createFormData = new FormData();
        this.previewUrl = '';
      }
    );
  }

  // Table

  onEditModal(event) {
    this.alertifyService.message('Ładuję...');
    this.posterService
      .getPoster(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedPoster = res.body;
        this.editForm.setValue({
          description: this.selectedPoster.description,
          happensAt: this.selectedPoster.happensAt,
          visible: this.selectedPoster.visible === 1 ? 'Widoczny' : 'Ukryty',
          image: null
        });
        this.modalService.open(this.editModal, {
          centered: true
        });
      });
  }

  onSelectEditFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      this.editFormData = new FormData();
      this.editFormData.append(file.name, file);
      console.log(this.editFormData);
    }
  }

  onSubmitEdit() {
    this.editFormData.set('id', this.selectedPoster.id.toString());
    this.editFormData.set('description', this.editForm.value.description);
    this.editFormData.set('happensAt', this.editForm.value.happensAt);
    this.editFormData.set('visible', this.editForm.value.visible);

    this.posterService.updatePoster(this.editFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.loadPosters();
          this.alertifyService.success(
            'Zaktualizowano plakat "' + this.editForm.value.description + '"'
          );
        } else {
          this.alertifyService.error(
            'Błąd przy aktualizacji plakatu "' +
              this.editForm.value.description +
              '"'
          );
        }
        this.editForm.reset();
        this.editFormData = new FormData();
      },
      error => {
        console.log(error);
        this.alertifyService.error(
          'Błąd przy aktualizacji plakatu "' +
            this.editForm.value.description +
            '"'
        );
        this.editForm.reset();
        this.editFormData = new FormData();
      }
    );
  }

  onPreviewModal(event) {
    this.posterService
      .getPoster(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedPoster = res.body;
        this.modalService.open(this.previewModal, {
          centered: true
        });
      });
  }

  onDeleteModal(event) {
    this.posterService
      .getPoster(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedPoster = res.body;
        this.modalService.open(this.deleteModal, {
          centered: true
        });
      });
  }

  onDelete() {
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

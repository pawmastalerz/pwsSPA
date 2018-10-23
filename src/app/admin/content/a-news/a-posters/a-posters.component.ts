import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PosterService } from 'src/services/poster.service';
import { AuthService } from 'src/services/auth.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Poster } from 'src/models/Poster';
import { environment } from 'src/environments/environment';

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
    private modalService: NgbModal
  ) {
    this.source = new LocalDataSource();
    this.loadPosters();
  }

  ngOnInit() {}

  loadPosters() {
    if (this.authService.isAuthenticated) {
      this.posterService.getAllPosters().subscribe(
        (res: any) => {
          this.source.load(res.body);
          console.log(this.source);
          // console.log(+res.status);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

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
        console.log(res);
        this.loadPosters();
      },
      error => {
        console.log(error);
      }
    );
    this.createForm.reset();
    this.createFormData = new FormData();
    this.previewUrl = '';
  }

  onEditModal(event) {
    this.posterService
      .getPoster(Number(event.data.id))
      .subscribe((res: any) => {
        this.selectedPoster = res.body;
        console.log(this.selectedPoster);
        this.modalService.open(this.editModal, {
          centered: true
        });
      });
  }

  onSelectEditFile(event) {
    console.log(event);
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
        console.log(res);
        this.loadPosters();
      },
      error => {
        console.log(error);
      }
    );
  }
}

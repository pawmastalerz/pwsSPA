import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/services/event.service';
import { AuthService } from 'src/services/auth.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from 'src/models/Event';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/services/alertify.service';
import * as moment from 'moment';

@Component({
  selector: 'app-a-events',
  templateUrl: './a-events.component.html',
  styleUrls: ['./a-events.component.scss']
})
export class AEventsComponent implements OnInit {
  @ViewChild('deleteEventModal')
  deleteEventModal: ElementRef;

  rootUrl = environment.rootUrl;

  selectedEvent: Event;
  previewCreateEventUrl = '';
  previewEditEventUrl = '';
  showEventDetails = false;
  showEventsOnSite = true;

  createEventForm = new FormGroup({
    eventName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(600)
    ]),
    happensAt: new FormControl('', Validators.required),
    signUpLink: new FormControl('', [
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    accepted: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });
  createEventFormData = new FormData();

  editEventForm = new FormGroup({
    eventName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(600)
    ]),
    happensAt: new FormControl('', Validators.required),
    signUpLink: new FormControl('', [
      Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    accepted: new FormControl('', Validators.required),
    image: new FormControl('')
  });
  editEventFormData = new FormData();

  settings = {
    columns: {
      eventName: {
        title: 'Nazwa'
      },
      happensAt: {
        title: 'Data',
        valuePrepareFunction: value => {
          const formatted = moment(value).format('DD-MM-YYYY');
          return formatted;
        }
      },
      signUpLink: {
        title: 'Link do rejestracji'
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
    noDataMessage: 'Nie znaleziono żadnych wydarzeń w bazie'
  };

  source: LocalDataSource;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private modalService: NgbModal,
    private alertifyService: AlertifyService
  ) {
    this.source = new LocalDataSource();
    this.loadEvents();
  }

  ngOnInit() {}

  loadEvents() {
    if (this.authService.isAuthenticated) {
      this.eventService.getAllEvents().subscribe(
        (res: any) => {
          if (+res.status === 200) {
            this.source.load(res.body);
          } else {
            this.alertifyService.error('Błąd podczas ładowania listy wydarzeń');
          }
          this.showEventsOnSite = false;
          setTimeout(() => {
            this.showEventsOnSite = true;
          }, 300);
        },
        error => {
          console.log(error);
          this.alertifyService.error('Błąd podczas ładowania listy wydarzeń');
          this.showEventsOnSite = false;
          setTimeout(() => {
            this.showEventsOnSite = true;
          }, 300);
        }
      );
    }
  }

  // New event

  onSelectEventFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewCreateEventUrl = String(reader.result);
      };

      this.createEventFormData = new FormData();
      this.createEventFormData.append(file.name, file);
    }
  }

  onEventCreateSubmit() {
    this.createEventFormData.set(
      'eventName',
      this.createEventForm.value.eventName
    );
    this.createEventFormData.set(
      'description',
      this.createEventForm.value.description
    );
    this.createEventFormData.set(
      'happensAt',
      this.createEventForm.value.happensAt
    );
    this.createEventFormData.set(
      'signUpLink',
      this.createEventForm.value.signUpLink
    );
    this.createEventFormData.set(
      'accepted',
      this.createEventForm.value.accepted
    );

    this.eventService.createEvent(this.createEventFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertifyService.success('Utworzono wydarzenie');
        } else {
          this.alertifyService.error('Błąd przy tworzeniu wydarzenia');
        }
        this.loadEvents();
        this.createEventForm.reset();
        this.createEventFormData = new FormData();
        this.previewCreateEventUrl = '';
      },
      error => {
        console.log(error);
        this.alertifyService.error('Błąd przy tworzeniu wydarzenia');
        this.createEventForm.reset();
        this.createEventFormData = new FormData();
        this.previewCreateEventUrl = '';
      }
    );
  }

  // Table

  onEditEvent(event) {
    this.alertifyService.message('Ładuję...');
    this.eventService.getEvent(Number(event.data.eventId)).subscribe((res: any) => {
      this.selectedEvent = res.body;
      this.editEventForm.setValue({
        eventName: this.selectedEvent.eventName,
        description: this.selectedEvent.description,
        happensAt: this.selectedEvent.happensAt,
        signUpLink: this.selectedEvent.signUpLink,
        accepted: this.selectedEvent.accepted === 1 ? 'Przyjęto' : 'Oczekuje',
        image: null
      });
      console.log(this.selectedEvent.happensAt);
      console.log(this.editEventForm.value);
      this.previewEditEventUrl =
        this.rootUrl + this.selectedEvent.posterPhotoUrl;
      this.showEventDetails = true;
    });
  }

  onSelectEditEventFile(event) {
    if (event.target.files.length === 0) {
      return;
    }

    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewEditEventUrl = String(reader.result);
      };

      this.editEventFormData = new FormData();
      this.editEventFormData.append(file.name, file);
      console.log(this.editEventFormData);
    }
  }

  onEventEditSubmit() {
    this.editEventFormData.set('eventId', this.selectedEvent.eventId.toString());
    this.editEventFormData.set('eventName', this.editEventForm.value.eventName);
    this.editEventFormData.set('description', this.editEventForm.value.description);
    this.editEventFormData.set('happensAt', this.editEventForm.value.happensAt);
    this.editEventFormData.set(
      'signUpLink',
      this.editEventForm.value.signUpLink
    );
    this.editEventFormData.set('accepted', this.editEventForm.value.accepted);

    this.eventService.updateEvent(this.editEventFormData).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.loadEvents();
          this.alertifyService.success('Zaktualizowano wydarzenie');
        } else {
          this.alertifyService.error('Błąd przy aktualizacji wydarzenia');
        }
        this.editEventForm.reset();
        this.editEventFormData = new FormData();
      },
      error => {
        console.log(error);
        this.alertifyService.error('Błąd przy aktualizacji wydarzenia');
        this.editEventForm.reset();
        this.editEventFormData = new FormData();
      }
    );
  }

  closeEventDetails() {
    this.showEventDetails = false;
  }

  onDeleteEventModal(event) {
    this.eventService.getEvent(Number(event.data.eventId)).subscribe((res: any) => {
      this.selectedEvent = res.body;
      this.modalService.open(this.deleteEventModal, {
        centered: true
      });
    });
  }

  onDeleteEvent() {
    this.eventService.deleteEvent(Number(this.selectedEvent.eventId)).subscribe(
      (res: any) => {
        if (+res.status === 200) {
          this.alertifyService.error('Usunięto wydarzenie');
        } else {
          this.alertifyService.error('Błąd przy usuwaniu wydarzenia');
        }
        this.loadEvents();
      },
      error => {
        console.log(error);
        this.alertifyService.error('Błąd przy usuwaniu wydarzenia');
      }
    );
  }
}

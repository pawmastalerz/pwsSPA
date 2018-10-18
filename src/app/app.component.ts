import { AMPostersConfirmDeleteComponent } from './modals/a-m-posters-confirm-delete/a-m-posters-confirm-delete.component';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private modalService: NgbModal) {}

  openFormModal() {
    const modalRef = this.modalService.open(AMPostersConfirmDeleteComponent);

    modalRef.result
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

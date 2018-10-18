import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-a-m-posters-confirm-delete',
  templateUrl: './a-m-posters-confirm-delete.component.html',
  styleUrls: ['./a-m-posters-confirm-delete.component.scss']
})
export class AMPostersConfirmDeleteComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}

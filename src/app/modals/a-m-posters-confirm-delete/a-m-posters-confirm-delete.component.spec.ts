import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMPostersConfirmDeleteComponent } from './a-m-posters-confirm-delete.component';

describe('AMPostersConfirmDeleteComponent', () => {
  let component: AMPostersConfirmDeleteComponent;
  let fixture: ComponentFixture<AMPostersConfirmDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMPostersConfirmDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMPostersConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APostersPhotoEditComponent } from './a-posters-photo-edit.component';

describe('APostersPhotoEditComponent', () => {
  let component: APostersPhotoEditComponent;
  let fixture: ComponentFixture<APostersPhotoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APostersPhotoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APostersPhotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

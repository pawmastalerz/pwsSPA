import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APostersComponent } from './a-posters.component';

describe('APostersComponent', () => {
  let component: APostersComponent;
  let fixture: ComponentFixture<APostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

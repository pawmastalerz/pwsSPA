import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AEventsComponent } from './a-events.component';

describe('AEventsComponent', () => {
  let component: AEventsComponent;
  let fixture: ComponentFixture<AEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

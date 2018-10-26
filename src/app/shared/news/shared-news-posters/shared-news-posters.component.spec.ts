import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNewsPostersComponent } from './shared-news-posters.component';

describe('SharedNewsPostersComponent', () => {
  let component: SharedNewsPostersComponent;
  let fixture: ComponentFixture<SharedNewsPostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedNewsPostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedNewsPostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

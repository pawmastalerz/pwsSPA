import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNewsThoughtsComponent } from './shared-news-thoughts.component';

describe('SharedNewsThoughtsComponent', () => {
  let component: SharedNewsThoughtsComponent;
  let fixture: ComponentFixture<SharedNewsThoughtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedNewsThoughtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedNewsThoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

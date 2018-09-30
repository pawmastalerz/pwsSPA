import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLastEntryComponent } from './news-last-entry.component';

describe('NewsLastEntryComponent', () => {
  let component: NewsLastEntryComponent;
  let fixture: ComponentFixture<NewsLastEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLastEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLastEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ANewsComponent } from './a-news.component';

describe('ANewsComponent', () => {
  let component: ANewsComponent;
  let fixture: ComponentFixture<ANewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ANewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ANewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

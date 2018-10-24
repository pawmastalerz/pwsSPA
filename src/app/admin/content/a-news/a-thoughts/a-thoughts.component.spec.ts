import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AThoughtsComponent } from './a-thoughts.component';

describe('AThoughtsComponent', () => {
  let component: AThoughtsComponent;
  let fixture: ComponentFixture<AThoughtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AThoughtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AThoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

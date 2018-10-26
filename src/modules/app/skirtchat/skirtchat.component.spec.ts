import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkirtchatComponent } from './skirtchat.component';

describe('SkirtchatComponent', () => {
  let component: SkirtchatComponent;
  let fixture: ComponentFixture<SkirtchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkirtchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkirtchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

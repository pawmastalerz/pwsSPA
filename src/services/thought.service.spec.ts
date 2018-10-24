import { TestBed, inject } from '@angular/core/testing';

import { ThoughtService } from './thought.service';

describe('ThoughtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThoughtService]
    });
  });

  it('should be created', inject([ThoughtService], (service: ThoughtService) => {
    expect(service).toBeTruthy();
  }));
});

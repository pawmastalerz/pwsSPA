/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ActivateAuthGuardService } from './activate-auth-guard.service';

describe('Service: AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateAuthGuardService]
    });
  });

  it('should ...', inject([ActivateAuthGuardService], (service: ActivateAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});

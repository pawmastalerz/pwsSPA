/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeactivateAuthGuardService } from './deactivate-auth-guard.service';

describe('Service: DeactivateAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeactivateAuthGuardService]
    });
  });

  it('should ...', inject([DeactivateAuthGuardService], (service: DeactivateAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});

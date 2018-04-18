import { TestBed, inject } from '@angular/core/testing';

import { NewscandidateService } from './newscandidate.service';

describe('NewscandidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewscandidateService]
    });
  });

  it('should be created', inject([NewscandidateService], (service: NewscandidateService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { NewsuserService } from './newsuser.service';

describe('NewsuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsuserService]
    });
  });

  it('should be created', inject([NewsuserService], (service: NewsuserService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { TypeGiftService } from './type-gift.service';

describe('TypeGiftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeGiftService]
    });
  });

  it('should be created', inject([TypeGiftService], (service: TypeGiftService) => {
    expect(service).toBeTruthy();
  }));
});

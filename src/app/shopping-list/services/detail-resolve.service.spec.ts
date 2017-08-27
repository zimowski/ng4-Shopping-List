import { TestBed, inject } from '@angular/core/testing';

import { DetailResolveService } from './detail-resolve.service';

describe('DetailResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailResolveService]
    });
  });

  it('should be created', inject([DetailResolveService], (service: DetailResolveService) => {
    expect(service).toBeTruthy();
  }));
});

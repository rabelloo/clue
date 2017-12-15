import { TestBed, inject } from '@angular/core/testing';

import { Notifier } from './notifier.service';

describe('Notifier', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Notifier]
    });
  });

  it('should be created', inject([Notifier], (service: Notifier) => {
    expect(service).toBeTruthy();
  }));
});

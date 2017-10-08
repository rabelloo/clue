import { TestBed, inject } from '@angular/core/testing';

import { HistoryGuard } from './history.guard';

describe('HistoryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryGuard]
    });
  });

  it('should be created', inject([HistoryGuard], (service: HistoryGuard) => {
    expect(service).toBeTruthy();
  }));
});

import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { HistoryGuard } from './history.guard';

describe('HistoryGuard', () => {
  const storeStub = {
    select() {
      return {
        pipe() {},
      };
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryGuard, { provide: Store, useValue: storeStub }],
    });
  });

  it('should be created', inject([HistoryGuard], (service: HistoryGuard) => {
    expect(service).toBeTruthy();
  }));
});

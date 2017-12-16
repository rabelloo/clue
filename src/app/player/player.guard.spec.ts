import { TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { PlayerGuard } from './player.guard';

describe('PlayerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerGuard,
        { provide: Store, useValue: {} },
      ]
    });
  });

  it('should be created', inject([PlayerGuard], (service: PlayerGuard) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { PlayerGuard } from './player.guard';

describe('PlayerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerGuard]
    });
  });

  it('should be created', inject([PlayerGuard], (service: PlayerGuard) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { PlayerResolver } from './player.resolver';

describe('PlayerResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerResolver]
    });
  });

  it('should be created', inject([PlayerResolver], (service: PlayerResolver) => {
    expect(service).toBeTruthy();
  }));
});

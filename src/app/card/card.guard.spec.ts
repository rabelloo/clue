import { TestBed, inject } from '@angular/core/testing';

import { CardGuard } from './card.guard';

describe('CardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardGuard]
    });
  });

  it('should be created', inject([CardGuard], (resolver: CardGuard) => {
    expect(resolver).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { CardResolver } from './card.resolver';

describe('CardResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardResolver]
    });
  });

  it('should be created', inject([CardResolver], (resolver: CardResolver) => {
    expect(resolver).toBeTruthy();
  }));
});

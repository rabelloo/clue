import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CardGuard } from './card.guard';

describe('CardGuard', () => {
  const storeStub = {
    select() {
      return {
        pipe() {},
      };
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardGuard, { provide: Store, useValue: storeStub }],
    });
  });

  it('should be created', inject([CardGuard], (resolver: CardGuard) => {
    expect(resolver).toBeTruthy();
  }));
});

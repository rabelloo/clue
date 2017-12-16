import { TestBed, inject } from '@angular/core/testing';

import { CardGuard } from './card.guard';
import { Store } from '@ngrx/store';

describe('CardGuard', () => {
  const storeStub = {
    select() {
      return {
        pipe() { }
      };
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardGuard,
        { provide: Store, useValue: storeStub },
      ]
    });
  });

  it('should be created', inject([CardGuard], (resolver: CardGuard) => {
    expect(resolver).toBeTruthy();
  }));
});

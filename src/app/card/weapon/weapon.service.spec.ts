import { TestBed, inject } from '@angular/core/testing';
import 'rxjs/add/operators/count';

import { WeaponService } from './weapon.service';

describe('WeaponService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeaponService]
    });
  });

  it('should be created', inject([WeaponService], (service: WeaponService) => {
    expect(service).toBeTruthy();
  }));
});

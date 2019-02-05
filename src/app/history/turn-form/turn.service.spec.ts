import { inject, TestBed } from '@angular/core/testing';
import { LocalForageService } from '../../core/local-forage/local-forage.service';
import { Notifier } from '../../core/notifier/notifier.service';
import { TurnService } from './turn.service';

describe('TurnService', () => {
  const localForageStub = {
    getIdTable() {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TurnService,
        { provide: LocalForageService, useValue: localForageStub },
        { provide: Notifier, useValue: {} },
      ],
    });
  });

  it('should be created', inject([TurnService], (service: TurnService) => {
    expect(service).toBeTruthy();
  }));
});

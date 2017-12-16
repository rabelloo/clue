import { TestBed, inject } from '@angular/core/testing';

import { LocalForageService } from '../core/local-forage/local-forage.service';
import { Notifier } from '../core/notifier/notifier.service';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  const localForageStub = {
    getIdTable() {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerService,
        { provide: LocalForageService, useValue: localForageStub },
        { provide: Notifier, useValue: {} },
      ]
    });
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));
});

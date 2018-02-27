import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { Notifier } from '../core/notifier/notifier.service';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  const dbStub = {
    collection: name => name
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerService,
        { provide: AngularFirestore, useValue: dbStub },
        { provide: Notifier, useValue: {} },
      ]
    });
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));
  
});

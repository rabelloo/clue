import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { FirestoreCollection } from '../core/firestore/firestore-collection';
import { Notifier } from '../core/notifier/notifier.service';
import { Player } from './player';

@Injectable()
export class PlayerService extends FirestoreCollection<Player> {

  constructor(db: AngularFirestore,
              private notifier: Notifier) {
    super(db, 'players');
  }

  save(player: Player): Observable<Player> {
    const { character, ...rest } = player;
    return super.save(rest);
  }

  delete(player: Player): Observable<boolean> {
    const message = `Are you sure you want to delete player ${player.name || '"Unnamed"'}?`;

    if (this.notifier.confirm(message)) {
      return super.delete(player)
                 .pipe(
                   map(() => true)
                 );
    }

    return of(false);
  }

}

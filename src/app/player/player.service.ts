import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { FirestoreCollection } from '../core/firestore/firestore-collection';
import { Notifier } from '../core/notifier/notifier.service';
import { Player } from './player';

@Injectable({ providedIn: 'root' })
export class PlayerService extends FirestoreCollection<Player> {
  constructor(db: AngularFirestore, private notifier: Notifier) {
    super(db, 'players');
  }

  save(player: Partial<Player>): Observable<Player> {
    const { character, ...rest } = player;
    return super.save(rest);
  }

  delete(player: Player): Observable<Player> {
    const name = player.name || '"Unnamed"';
    const message = `Are you sure you want to delete player ${name}?`;

    if (this.notifier.confirm(message)) {
      return super.delete(player);
    }

    return of(undefined);
  }
}

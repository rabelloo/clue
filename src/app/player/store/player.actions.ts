import { Action } from '@ngrx/store';
import { Player } from '../player';

export enum PlayerActionTypes {
  create = '[Player list] create new player',
  delete = '[Player form] delete player',
  deleted = '[Player effects] deleted player',
  deleteError = '[Player effects] failed to delete player',
  save = '[Player form] save player',
  saved = '[Player effects] saved player',
  saveError = '[Player effects] failed to save player',
  sync = '[Player list] sync players',
  unsync = '[Player list] unsync players',
}

export class CreatePlayer implements Action {
  readonly type = PlayerActionTypes.create;
}

export class DeletePlayer implements Action {
  readonly type = PlayerActionTypes.delete;

  constructor(public player: Player) {}
}

export class DeletedPlayer implements Action {
  readonly type = PlayerActionTypes.deleted;

  constructor(public player: Player) {}
}

export class DeletePlayerError implements Action {
  readonly type = PlayerActionTypes.deleteError;

  constructor(public player: Player) {}
}

export class SavePlayer implements Action {
  readonly type = PlayerActionTypes.save;

  constructor(public player: Player) {}
}

export class SavedPlayer implements Action {
  readonly type = PlayerActionTypes.saved;

  constructor(public player: Player) {}
}

export class SavePlayerError implements Action {
  readonly type = PlayerActionTypes.saveError;

  constructor(public player: Player) {}
}

export class SyncPlayers implements Action {
  readonly type = PlayerActionTypes.sync;
}

export class UnsyncPlayers implements Action {
  readonly type = PlayerActionTypes.unsync;
}

export type PlayerAction =
  | CreatePlayer
  | DeletePlayer
  | DeletedPlayer
  | DeletePlayerError
  | SavePlayer
  | SavedPlayer
  | SavePlayerError
  | SyncPlayers
  | UnsyncPlayers;

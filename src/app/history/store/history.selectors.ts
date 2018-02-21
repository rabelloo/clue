import { ClueState } from '../../core/store/state';
import { HashMap } from '../../core/store/hash-map';
import { Round } from '../round/round';

import { PlayerSelectors } from '../../player/store/player.selectors';
import { Turn } from '../turn-form/turn';

export const HistorySelectors = {
  currentRound: currentRoundSelector,
  nextRound: nextRoundSelector,
  loaded: historyLoadedSelector,
  rounds: roundsSelector,
  turns: turnsSelector,
  turnCount: turnCountSelector,
};

export function currentRoundSelector(state: ClueState): number {
  return Object.values(state.history)
          .map(t => t.round)
          .max()
      || 1;
}

export function nextRoundSelector(state: ClueState) {
  const currentRound = currentRoundSelector(state);
  const playerCount = PlayerSelectors.count(state) || 6;
  const currentTurn = turnsSelector(state)
                      .sortBy(t => t.order)
                      .reverse()
                      .find(t => t.round === currentRound)
                      || { order: 0 };

  let nextRound = currentRound;
  let nextTurn = currentTurn.order + 1;

  if (nextTurn > playerCount) {
    ++nextRound;
    nextTurn = 1;
  }

  return {
    round: nextRound,
    turn: nextTurn,
    playerId: PlayerSelectors.all(state).find(p => p.order === nextTurn).id,
  };
}

export function historyLoadedSelector(state: ClueState) {
  return state.historyLoaded;
}

export function roundsSelector(state: ClueState): Round[] {
  const rounds = turnsSelector(state)
                  .groupBy(t => t.round);

  return Object.keys(rounds)
               .map(id => ({ number: +id, turns: rounds[id] }));
}

export function turnsSelector(state: ClueState): Turn[] {
  return Object.values(state.history)
              .map(t => (
                {
                  ...t,
                  player: state.players[t.playerId],
                  disprove: t.disprove ? {
                    ...t.disprove,
                    card: state.cards[t.disprove.cardId] || {},
                    player: state.players[t.disprove.playerId] || {},
                  } : {},
                  suggestion: t.suggestion ? {
                    ...t.suggestion,
                    room: state.cards[t.suggestion.roomId] || {},
                    suspect: state.cards[t.suggestion.suspectId] || {},
                    weapon: state.cards[t.suggestion.weaponId] || {},
                  } : {},
                } as Turn
              )
            );
}

export function turnCountSelector(state: ClueState): number {
  return Object.keys(state.history).length;
}

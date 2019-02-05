import { Suspect } from '../card/suspect/suspect';

export interface Player {
  id: string;
  name: string;
  order: number;
  characterId: number;
  character?: Suspect;
  cardIds: number[];
}

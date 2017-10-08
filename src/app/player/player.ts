import { Suspect } from '../card/suspect/suspect';

export interface Player {
    id: number;
    name: string;
    order: number;
    characterId: number;
    character: Suspect;
    cardIds: number[];
}

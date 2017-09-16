import { Room } from './room/room';
import { Suspect } from './suspect/suspect';
import { Weapon } from './weapon/weapon';

export interface CardCollection {
    rooms: Room[];
    suspects: Suspect[];
    weapons: Weapon[];
}

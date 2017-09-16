import { Room } from '../../card/room/room';
import { Suspect } from '../../card/suspect/suspect';
import { Weapon } from '../../card/weapon/weapon';

export class Suggestion {
    roomId: number;
    room: Room;

    suspectId: number;
    suspect: Suspect;

    weaponId: number;
    weapon: Weapon;
}

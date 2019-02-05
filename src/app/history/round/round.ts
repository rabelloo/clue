import { Turn } from '../turn-form/turn';

export interface Round {
  number: number;
  turns: Turn[];
}

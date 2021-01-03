import { IPlayer } from './player.interface';

export interface ISetting {
  players: IPlayer[];
  maxCards: number;
  highestDouble: boolean;
  lowestDouble: boolean;
  round: number;
  cards: number;
  asc: boolean;
  doublePlay: boolean;
}

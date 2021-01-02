import { IPlayer } from './player.interface';

export interface ISetting {
  players: IPlayer[];
  maxCards: number;
  highestDouble: boolean;
  lowestDouble: boolean;
}

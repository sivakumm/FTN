export interface IPlayer {
  name: string;
  announcement: number;
  actual: number;
  pointsHistory: number[];
  currentPoints?: number;
}

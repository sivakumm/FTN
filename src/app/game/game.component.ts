import { Component, OnInit } from '@angular/core';
import { ISetting } from '../interfaces/setting.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  settings!: ISetting;
  round = 1;
  cards = 1;
  playerIdx = 0;
  disabledNr = -1;
  asc = false;
  doublePlay = false;
  gameProcess = 0;

  constructor() { }

  ngOnInit(): void {
    const storage = localStorage.getItem('gameSetting');
    if (storage !== null) {
      this.settings = JSON.parse(storage);
      this.gameProcess = 0;
    }
  }

  choises(): number[] {
    return Array.from({ length: this.cards + 1 }, (_, idx) => idx);
  }

  makeChoise(value: number): void {
    if (this.gameProcess === 0) {
      this.settings.players[this.playerIdx].announcement = value;
      this.nextPlayerIdx();
      if (this.playerIdx === this.settings.players.length - 1) {
        this.disabledNr = (this.cards - this.settings.players.map(player => player.announcement)
          .reduce((prev, curr) => prev = curr >= 0 ? prev + curr : prev));
      }
      if (this.playerIdx === 0) {
        this.disabledNr = -1;
        this.gameProcess++;
      }
    } else {
      this.settings.players[this.playerIdx].actual = value;
      this.nextPlayerIdx();
      if (this.playerIdx === 0) {
        this.gameProcess++;
        this.evaluateRound();
      }
    }
  }

  nextPlayerIdx(): void {
    this.playerIdx = (this.playerIdx + 1) % this.settings.players.length;
  }

  evaluateRound(): void {
    this.settings.players.forEach(player => {
      if (player.announcement === player.actual) {
        player.pointsHistory.push(player.announcement * 5 + 5);
      } else {
        player.pointsHistory.push(Math.abs(player.announcement - player.actual) * -5);
      }
    });
    this.settings.players.forEach(player => { player.actual = -1; player.announcement = -1; });
    this.evaluatePoints();
  }

  evaluatePoints(): void {
    this.settings.players.forEach(player => {
      player.currentPoints = player.pointsHistory.reduce((acc, curr) => acc + curr);
    });
  }

  startNextRound(): void {
    this.gameProcess = 0;
    this.playerIdx = 0;
    this.disabledNr = -1;
    this.round++;
    this.setNextCards();
  }

  setNextCards(): void {
    if (this.cards === 1) {
      this.handleDoublePlay(this.settings.lowestDouble);
    } else if (this.cards === this.settings.maxCards) {
      this.handleDoublePlay(this.settings.highestDouble);
    } else {
      this.asc ? this.cards++ : this.cards--;
    }
  }

  handleDoublePlay(setting: boolean): void {
    if (setting) {
      if (this.doublePlay) {
        this.doublePlay = false;
        this.asc = !this.asc;
        this.asc ? this.cards++ : this.cards--;
      } else {
        this.doublePlay = true;
      }
    } else {
      this.asc = !this.asc;
      this.asc ? this.cards++ : this.cards--;
    }
  }
}

import { UtilService } from './../service/util.service';
import { Component, OnInit } from '@angular/core';
import { ISetting } from '../interfaces/setting.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  settings!: ISetting;
  playerIdx = 0;
  disabledNr = -1;
  gameProcess = 0;

  bombValue = -1;

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    const settings = this.utilService.loadGameState();
    if (settings !== null) {
      this.settings = settings;
      this.gameProcess = 0;
    }
  }

  choises(): number[] {
    return Array.from({ length: this.settings.cards + 1 }, (_, idx) => idx);
  }

  makeChoise(value: number): void {
    if (this.gameProcess === 0) {
      this.settings.players[this.playerIdx].announcement = value;
      this.nextPlayerIdx();
      if (this.playerIdx === this.settings.players.length - 1) {
        this.disabledNr = (this.settings.cards - this.settings.players.map(player => player.announcement)
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
      if (this.settings.cards === 0) {
        player.pointsHistory.push(player.announcement === player.actual ? 5 : -5);
      } else {
        if (player.announcement === player.actual) {
          player.pointsHistory.push(player.announcement * 5 + 5);
        } else {
          player.pointsHistory.push(Math.abs(player.announcement - player.actual) * -5);
        }
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
    this.settings.round++;
    this.setNextCards();
    this.utilService.saveGameState(this.settings);
  }

  setNextCards(): void {
    if (this.settings.cards === 1) {
      this.handleDoublePlay(this.settings.lowestDouble);
    } else if (this.settings.cards === this.settings.maxCards) {
      this.handleDoublePlay(this.settings.highestDouble);
    } else {
      this.settings.asc ? this.settings.cards++ : this.settings.cards--;
    }
  }

  handleDoublePlay(setting: boolean): void {
    if (setting) {
      if (this.settings.doublePlay) {
        this.settings.doublePlay = false;
        this.settings.asc = !this.settings.asc;
        this.settings.asc ? this.settings.cards++ : this.settings.cards--;
      } else {
        this.settings.doublePlay = true;
      }
    } else {
      this.settings.asc = !this.settings.asc;
      this.settings.asc ? this.settings.cards++ : this.settings.cards--;
    }
  }

  bombClicked(): void {
    if (this.bombValue < 0) {
      this.bombValue = this.settings.cards + 1;
    } else {
      this.settings.players[this.playerIdx].actual = this.bombValue;
      this.bombValue = -1;
      this.nextPlayerIdx();
      if (this.playerIdx === 0) {
        this.gameProcess++;
        this.evaluateRound();
      }
    }
  }
}

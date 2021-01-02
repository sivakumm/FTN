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
  cards = 26;
  playerIdx = 0;

  constructor() { }

  ngOnInit(): void {
    const storage = localStorage.getItem('gameSetting');
    if (storage !== null) {
      this.settings = JSON.parse(storage);
    }
  }

  choises(): number[] {
    return Array.from({ length: this.cards + 1 }, (_, idx) => idx);
  }
}

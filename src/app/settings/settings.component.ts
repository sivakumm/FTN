import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  players = [
    { name: '' },
    { name: '' },
    { name: '' }
  ];

  constructor() { }

  addPlayer(): void {
    this.players.push({ name: '' });
  }

  removePlayer(playerIdx: number): void {
    this.players.splice(playerIdx, 1);
  }

}

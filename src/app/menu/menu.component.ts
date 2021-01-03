import { ISetting } from './../interfaces/setting.interface';
import { UtilService } from './../service/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  settings: ISetting | null = null;

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    this.settings = this.utilService.loadGameState();
  }

  newGame(): void {
    if (this.settings !== null) {
      this.settings.players.forEach(pl => pl.pointsHistory = []);
      this.utilService.saveGameState(this.settings);
      this.utilService.setPageState(2);
    }
  }

  doSettings(): void {
    this.utilService.setPageState(1);
  }

  resumeGame(): void {
    if (this.settings !== null) {
      this.utilService.setPageState(2);
    }
  }
}

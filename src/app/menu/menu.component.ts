import { ISetting } from './../interfaces/setting.interface';
import { UtilService } from './../service/util.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  settings: ISetting | null = null;

  constructor(private utilService: UtilService, private router: Router) { }

  ngOnInit(): void {
    this.settings = this.utilService.loadGameState();
  }

  newGame(): void {
    if (this.settings !== null) {
      this.settings.players.forEach(pl => pl.pointsHistory = []);
      this.utilService.saveGameState(this.settings);
      this.router.navigateByUrl('/game');
    }
  }

  doSettings(): void {
    this.router.navigateByUrl('/settings');
  }

  resumeGame(): void {
    if (this.settings !== null) {
      this.router.navigateByUrl('/game');
    }
  }

  showHistory(): void {
    if (this.settings !== null) {
      this.router.navigateByUrl('/charts');
    }
  }
}

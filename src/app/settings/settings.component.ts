import { Router } from '@angular/router';
import { UtilService } from './../service/util.service';
import { IPlayer } from './../interfaces/player.interface';
import { ISetting } from './../interfaces/setting.interface';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  NR_OF_CARDS = 52;

  settingsForm: FormGroup;
  settingsFound = false;

  constructor(private fb: FormBuilder, private utilService: UtilService, private router: Router) {
    this.settingsForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    const settings: ISetting | null = this.utilService.loadGameState();
    if (settings !== null) {
      this.maxCards.setValue(settings.maxCards);
      this.highestDouble.setValue(settings.highestDouble);
      this.lowestDouble.setValue(settings.lowestDouble);
      this.playerNames.setValue(settings.players.map(pl => pl.name));
      this.settingsFound = true;
    }
  }

  initializeForm(): void {
    this.settingsForm = this.fb.group({
      maxCards: this.fb.control(1),
      highestDouble: this.fb.control(true),
      lowestDouble: this.fb.control(false),
      playerNames: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control('')
      ], Validators.required)
    });
  }

  get maxCards(): FormControl {
    return this.settingsForm.get('maxCards') as FormControl;
  }

  get highestDouble(): FormControl {
    return this.settingsForm.get('highestDouble') as FormControl;
  }

  get lowestDouble(): FormControl {
    return this.settingsForm.get('lowestDouble') as FormControl;
  }

  get playerNames(): FormArray {
    return this.settingsForm.get('playerNames') as FormArray;
  }

  addPlayer(): void {
    this.playerNames.push(this.fb.control(''));
    const maxPossibleCards = Math.floor(this.NR_OF_CARDS / this.playerNames.length);
    if (this.maxCards.value > maxPossibleCards) {
      this.maxCards.setValue(maxPossibleCards);
    }
  }

  removePlayer(playerIdx: number): void {
    this.playerNames.removeAt(playerIdx);
  }

  isValidInputs(): boolean {
    return this.playerNames.length > 2 && this.playerNames.value.every((name: string) => name.length > 0);
  }

  onSubmit(): void {
    const players: IPlayer[] = this.playerNames.value.map((value: string) => {
      return {
        name: value,
        announcement: -1,
        actual: -1,
        pointsHistory: []
      };
    });

    const setting: ISetting = {
      highestDouble: this.highestDouble.value,
      lowestDouble: this.lowestDouble.value,
      maxCards: this.maxCards.value,
      players,
      round: 1,
      cards: 1,
      asc: false,
      doublePlay: false
    };
    this.utilService.saveGameState(setting);
    this.router.navigateByUrl('/game');
  }

  removeAlert(): void {
    this.settingsFound = false;
  }
}

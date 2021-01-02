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

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    const storage = localStorage.getItem('gameSetting');
    if (storage !== null) {
      const settings: ISetting = JSON.parse(storage);
      this.maxCards.setValue(settings.maxCards);
      this.highestDouble.setValue(settings.highestDouble);
      this.lowestDouble.setValue(settings.lowestDouble);
      this.playerNames.setValue(settings.players);
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
    const setting: ISetting = {
      highestDouble: this.highestDouble.value,
      lowestDouble: this.lowestDouble.value,
      maxCards: this.maxCards.value,
      players: this.playerNames.value
    };
    localStorage.setItem('gameSetting', JSON.stringify(setting));
  }
}

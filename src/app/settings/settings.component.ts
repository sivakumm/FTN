import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  playersForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.playersForm = fb.group({
      playerNames: fb.array([
        fb.control(''),
        fb.control(''),
        fb.control('')
      ], Validators.required)
    });
  }

  get playerNames(): FormArray {
    return this.playersForm.get('playerNames') as FormArray;
  }

  addPlayer(): void {
    this.playerNames.push(this.fb.control(''));
  }

  removePlayer(playerIdx: number): void {
    this.playerNames.removeAt(playerIdx);
  }

  isValidInputs(): boolean {
    return this.playerNames.length > 2 && this.playerNames.value.every((name: string) => name.length > 0);
  }

  onSubmit(): void {
    console.log(this.playerNames.status);
  }
}

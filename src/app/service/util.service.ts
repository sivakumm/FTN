import { ISetting } from './../interfaces/setting.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  saveGameState(settings: ISetting): void {
    localStorage.setItem('gameSetting', JSON.stringify(settings));
  }

  loadGameState(): ISetting | null {
    const storage = localStorage.getItem('gameSetting');
    if (storage !== null) {
      return JSON.parse(storage);
    }
    return null;
  }

  resetGameState(): void {
    localStorage.clear();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  players = [
    { name: '' },
    { name: '' },
    { name: '' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

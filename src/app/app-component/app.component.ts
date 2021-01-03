import { UtilService } from './../service/util.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  page = 0;

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    this.utilService.pageState.subscribe(pg => this.page = pg);
  }

  ngOnDestroy(): void {
    this.utilService.pageState.unsubscribe();
  }
}

import { UtilService } from './../service/util.service';
import { ISetting } from './../interfaces/setting.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      providers: [
        { provide: UtilService, useClass: MockUtilSerivce }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});

class MockUtilSerivce {
  loadGameState(): ISetting | null {
    return {
      highestDouble: true,
      lowestDouble: false,
      maxCards: 8,
      players: [{
        actual: -1,
        announcement: -1,
        name: 'Mock Name',
        pointsHistory: [],
        currentPoints: 0
      }]
    };
  }
}

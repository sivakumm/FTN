import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title h3 'Settings'`, () => {
    const h3s = fixture.debugElement.queryAll(By.css('h3'));
    expect(h3s.some(h3 => h3.nativeElement.textContent.includes('Settings'))).toBeTrue();
  });

  it(`should have initially 3 player name input fields`, () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const nameInputs = inputs.filter(inp => inp.nativeElement.id.includes('player-name'));
    expect(nameInputs.length).toBe(3);
  });

  it(`should have exactly one button to add players`, () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const addBtn = buttons.filter(btn => btn.nativeElement.textContent.toLowerCase().includes('add player'));
    expect(addBtn.length).toBe(1);
  });

  it(`should have exactly one button to start the game`, () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const startBtn = buttons.filter(btn => btn.nativeElement.textContent.toLowerCase().includes('start'));
    expect(startBtn.length).toBe(1);
  });

  it(`should have disabled the start button initially`, () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const startBtn = buttons.find(btn => btn.nativeElement.textContent.toLowerCase().includes('start'));
    expect(startBtn?.attributes.disabled).toBeDefined();
  });

  it(`should have a remove button for each player`, () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const nameInputs = inputs.filter(inp => inp.nativeElement.id.includes('player-name'));
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const removeBtns = buttons.filter(btn => btn.nativeElement.innerHTML.includes('×'));
    expect(removeBtns.length).toBe(nameInputs.length);
  });

  it(`should have disabled remove player button initially`, () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const removeBtns = buttons.filter(btn => btn.nativeElement.innerHTML.includes('×'));
    expect(removeBtns.every(btn => btn.attributes.disabled !== undefined)).toBeTrue();
  });
});

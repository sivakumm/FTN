import { ChartComponent } from './chart/chart.component';
import { GameComponent } from './game/game.component';
import { SettingsComponent } from './settings/settings.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'game', component: GameComponent },
  { path: 'charts', component: ChartComponent },
  { path: '', pathMatch: 'full', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

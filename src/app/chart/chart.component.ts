import { ISetting } from './../interfaces/setting.interface';
import { UtilService } from './../service/util.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chart: Chart | undefined;
  colors: string[] = [];
  settings: ISetting | null = null;

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    this.settings = this.utilService.loadGameState();
    if (this.settings) {
      this.colors = this.settings?.players.map(_ => '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
    }
    console.log(JSON.stringify(this.settings?.players));
    this.initializeCharts();
  }

  initializeCharts(): void {
    this.chart = new Chart('pointsTotal', {
      type: 'line',
      data: {
        labels: this.settings?.players[0].pointsHistory.map((_, idx) => 'Round ' + (idx + 1)),
        datasets: this.settings?.players.map((player, idx) => {
          let cumsum = 0;
          return {
            label: player.name,
            data: player.pointsHistory.map(pt => cumsum += pt),
            backgroundColor: this.colors[idx],
            borderColor: this.colors[idx],
            fill: false
          };
        })
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 5
            }
          }]
        }
      }
    });

    this.chart = new Chart('pointsPerRound', {
      type: 'bar',
      data: {
        labels: this.settings?.players[0].pointsHistory.map((_, idx) => 'Round ' + (idx + 1)),
        datasets: this.settings?.players.map((player, idx) => {
          return {
            label: player.name,
            data: player.pointsHistory,
            backgroundColor: this.colors[idx],
            borderColor: this.colors[idx],
            fill: false
          };
        })
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 5
            }
          }]
        }
      }
    });
  }
}

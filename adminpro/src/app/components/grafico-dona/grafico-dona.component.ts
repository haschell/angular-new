import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  public chartReady = true;
  // tslint:disable-next-line: no-input-rename
  @Input('chartLabels') public doughnutChartLabels: string[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('chartData') public doughnutChartData: number[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('chartType') public doughnutChartType = '';

  constructor() { }

  ngOnInit() {
  }

}

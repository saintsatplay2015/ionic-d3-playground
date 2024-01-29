import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { ScatterChartComponent } from '../components/scatter-chart/scatter-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, 
            IonToolbar, 
            IonTitle, 
            IonContent, 
            PieChartComponent, 
            BarChartComponent, 
            ScatterChartComponent],
})
export class HomePage {

  constructor() {}

}

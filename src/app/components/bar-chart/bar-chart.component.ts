import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Items } from 'src/app/interfaces/items';



@Component({
  standalone: true,
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements AfterViewInit {


  @ViewChild('elem') public elem!: ElementRef;


  private data: Array<Items> = [
    { Framework: 'Vue', Stars: 166443, Released: 2014 },
    { Framework: 'React', Stars: 150793, Released: 2013 },
    { Framework : 'Angular', Stars: 62342, Released: 2016 },
    { Framework: 'Backbone', Stars: 27647, Released: 2010 },
    { Framework: 'Ember', Stars: 21471, Released: 2011 }
  ];


  private svg!: any;


  private margin = 50;


  private width = 750 - (this.margin * 2);


  private height = 400 - (this.margin * 2);


  constructor() { }


  ngAfterViewInit() {
    this.createSvg();
    this.drawBars(this.data);
  }


  private createSvg(): void {
    this.svg = d3.select(this.elem.nativeElement)
    .append('svg')
    .attr('width', this.width + (this.margin * 2))
    .attr('height', this.height + (this.height))
    .append('g')
    .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }


  private drawBars(data: any[]): void {
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map( d => d.Framework))
    .padding(0.2);

    this.svg.append('g')
    .attr('transform', 'translate(0, ' + this.height + ')')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10, 0)rotate(-45)')
    .style('text-anchor', 'end');

    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    this.svg.append('g')
    .call(d3.axisLeft(y));

    this.svg.selectAll('bars')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d: Items) => x(d.Framework))
    .attr('y', (d: Items) => y(d.Stars))
    .attr('width', x.bandwidth())
    .attr('height', (d: Items) => this.height - y(d.Stars))
    .attr('fill', '#d04a35');
  }

}

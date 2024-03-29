import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Items } from 'src/app/interfaces/items';


@Component({
  standalone: true,
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements AfterViewInit {


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


  private width = 750;


  private height = 600;


  private radius = Math.min(this.width, this.height) / 2 - this.margin;


  private colors: any;


  constructor() { }


  ngAfterViewInit() {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }


  private createSvg(): void {
    this.svg = d3.select(this.elem.nativeElement)
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }


  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.Stars.toString()))
    .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }


  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
                 .innerRadius(0)
                 .outerRadius(this.radius))
    .attr('fill', (d: Items, i: number) => (this.colors(i)))
    .attr('stroke', '#129196')
    .style('stroke-width', '1px');

    const labels = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg.selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text((d: any) => d.data.Framework)
    .attr('transform', (d: any) => 'translate(' + labels.centroid(d) + ')')
    .style('text-anchor', 'middle')
    .style('font-size', 15);
  }

}

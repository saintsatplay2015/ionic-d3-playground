import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Items } from 'src/app/interfaces/items';

@Component({
  standalone: true,
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss'],
})
export class ScatterChartComponent implements AfterViewInit {


  @ViewChild('elem') public elem!: ElementRef;


  private data: Array<Items> = [
    { Framework: 'Vue', Stars: 166443, Released: 2014 },
    { Framework: 'React', Stars: 150793, Released: 2013 },
    { Framework : 'Angular', Stars: 62342, Released: 2016 },
    { Framework: 'Backbone', Stars: 27647, Released: 2010 },
    { Framework: 'Ember', Stars: 21471, Released: 2011 }
  ];


  private svg: any;


  private margin = 50;


  private width = 750 - (this.margin * 2);


  private height = 400 - (this.margin * 2);


  constructor() { }


  ngAfterViewInit(): void {
    this.createSvg();
    this.drawPlot();
  }


  private createSvg(): void {
    this.svg = d3.select(this.elem.nativeElement)
    .append('svg')
    .attr('width', this.width + (this.margin * 2))
    .attr('height', this.height + (this.margin * 2))
    .append('g')
    .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }


  private drawPlot(): void {
    const x = d3.scaleLinear()
    .domain([2009, 2017])
    .range([0, this.width]);

    this.svg.append('g')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([ this.height, 0]);

    this.svg.append('g')
    .call(d3.axisLeft(y));

    const dots = this.svg.append('g');

    dots.selectAll('dot')
    .data(this.data)
    .enter()
    .append('circle')
    .attr('cx', (d: Items) => x(d.Released))
    .attr('cy', (d: Items) => y(d.Stars))
    .attr('r', 7)
    .style('opacity', .5)
    .style('fill', '#69b3a2');

    dots.selectAll('text')
    .data(this.data)
    .enter()
    .append('text')
    .text((d: Items) => d.Framework)
    .attr('x', (d: Items) => x(d.Released))
    .attr('y', (d: Items) => y(d.Stars));

  }


}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cmp-finances',
  templateUrl: 'finances.html',
  
})
export class FinancesComponent implements OnInit {

  private dailyCosts: number;
  @Input() money: number;
  @Input() costs: number;
  private totalCosts: number;
  private earnings: number;

  constructor() {

    this.dailyCosts = 150;

  }

  ngOnInit() {
    console.log(`FinancesComponent: dailyCosts: ${this.dailyCosts}, money: ${this.money}`);

  }

  calcCosts() {
    this.totalCosts = this.costs + this.dailyCosts;
  }

//http://www.statisticshowto.com/expected-value/
  calcEarnings() {
    // this.earnings
  }

}
import { Component, Input, OnInit } from '@angular/core';

import { Events } from 'ionic-angular';

import { Product } from '../../models/products';
import { ProductInventory } from '../../models/productInventory';

@Component({
  selector: 'cmp-finances',
  templateUrl: 'finances.html',
  
})
export class FinancesComponent implements OnInit {

  private dailyCosts: number;
  @Input() money: number;
  @Input() costs: number;

  private totalCosts: number;
  @Input() earnings: number;
  @Input() dailyBalance: number;


  constructor(public events: Events) {

    this.dailyCosts = 150;

  }


  ngOnInit() {
    console.log(`FinancesComponent: dailyCosts: ${this.dailyCosts}, money: ${this.money}`);

    this.calcCosts();

  }

  calcCosts() {
    this.totalCosts = this.costs + this.dailyCosts;

    console.log(`calcCosts(): this.totalCosts = ${this.totalCosts}`);
  }
 

}
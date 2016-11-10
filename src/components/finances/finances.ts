import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cmp-finances',
  templateUrl: 'finances.html',
  
})
export class FinancesComponent implements OnInit {

  private dailyCosts: number;
  @Input() money: number;

  constructor() {

    this.dailyCosts = 150;

  }

  ngOnInit() {
    console.log(`FinancesComponent: dailyCosts: ${this.dailyCosts}, money: ${this.money}`);

  }

}
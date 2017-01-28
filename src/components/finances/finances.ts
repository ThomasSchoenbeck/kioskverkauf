import { Component, Input, OnInit } from '@angular/core';

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
  @Input() inventory: ProductInventory[];
  private totalCosts: number;
  private earnings: number;
  private BuyersPerBuilding: {id:number, buyers: number}[]; // cannot assign [] because it does not fit the properties
  private allBuyers: number = 0;

  constructor() {

    this.dailyCosts = 150;

  }


  Buildings = [
    { id: 1, name: 'School'      , people: 400 , products: [2,3,4]  },
    { id: 2, name: 'Construction', people: 50  , products: [5,6,7]  },
    { id: 3, name: 'Dentist'     , people: 100 , products: [8,9,10] }
  ]


  ngOnInit() {
    console.log(`FinancesComponent: dailyCosts: ${this.dailyCosts}, money: ${this.money}`);
    console.log(JSON.stringify(this.Buildings));

    this.calcCosts();

    this.calcBuyers();

    this.calcEarnings();

  }

  calcCosts() {
    this.totalCosts = this.costs + this.dailyCosts;

    console.log(`calcCosts(): this.totalCosts = ${this.totalCosts}`);
  }

  calcBuyers() {
	
    let counter = 0;

    this.BuyersPerBuilding = [];
    
    this.Buildings.forEach( data => {

    //standard 10%
      this.BuyersPerBuilding.push({id: data.id, buyers: data.people*0.1});
      // this.BuyersPerBuilding[counter].id = data.id;
      // this.BuyersPerBuilding[counter].buyers = data.people * 0.1;

      
      console.log(`Standard 10% buyers = BuyersPerBuilding[${counter}].buyers = ${this.BuyersPerBuilding[counter].buyers}`);
    
    //matchProducts result:%-value
    // - match 1 and get + 5%
    // - match 2 and get +10%
    // - match 3 and get +20%
    // - match 4 and get +30%
    
      let matchProducts: number = 0;

      for (let i = this.inventory.length; i--;) {
        for (let j = data.products.length; j--;) {
          if (this.inventory[i].id === data.products[j]) {
            matchProducts++;
          }
        }
      }



    //   let props = ['id', 'item'];
      
    // //http://stackoverflow.com/questions/32965688/comparing-two-arrays-of-objects-and-exclude-the-elements-who-match-values-into/32966051#32966051
    //   let result = this.inventory.filter( o1 => {
    //     return this.Buildings.some( o2 => {
    //       return o1.id === o2.id;
    //     });
    //   }).map( o => {
    //     return props.reduce(function(item, id) {
    //       item[id] = o[id];
    //       return item;
    //     }, {});
    //   });
      
    //   let match = result.length;

      let match = matchProducts;
      
      if (match == 1) {
        this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * 0.10;
      } else if (match == 2) {
        this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * 0.20;
      } else if (match == 3) {
        this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * 0.30;
      } else if (match == 4) {
        this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * 0.40;
      }
      
      console.log(`after Product Match(#${match}): BuyersPerBuilding[${counter}].buyers = ${this.BuyersPerBuilding[counter].buyers}`);
      

    //weather -5% to +10%
    
      let weatherPercentage = (Math.floor(Math.random() * 16 + (-5)) / 100);
    
      this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * weatherPercentage;
      console.log(`after Weather(${weatherPercentage}%): BuyersPerBuilding[${counter}].buyers = ${this.BuyersPerBuilding[counter].buyers}`);
    
    //success rate -5% to +5%
    
      let successratePercentage = (Math.floor(Math.random() * 11 + (-5)) / 100);
      this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * successratePercentage;
      console.log(`after Successrate(${successratePercentage}%): BuyersPerBuilding[${counter}].buyers = ${this.BuyersPerBuilding[counter].buyers}`);
    
    //Upgrades
    
    //variance 5% + or -
    
      let variancePercentage = (Math.floor(Math.random() * 11 + (-5)) / 100);
      this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * variancePercentage;
      console.log(`after Buyers Variance(${variancePercentage}%): BuyersPerBuilding[${counter}].buyers = ${this.BuyersPerBuilding[counter].buyers}`);
    
      counter = counter + 1;
      console.log(`--------------------------------------`);

    });

    console.log(`this.BuyersPerBuilding: ${JSON.stringify(this.BuyersPerBuilding)}`);

    this.BuyersPerBuilding.forEach(data => {
      this.allBuyers = this.allBuyers + data.buyers;
    });

    console.log(`all buyers for this round: ${this.allBuyers}`);

  }



//http://www.statisticshowto.com/expected-value/
  calcEarnings() {
    // this.earnings

    // all buyers * 22%-77%  = buyers of product 1 
    let buyersOfProduct1Percentage = (Math.floor(Math.random() * 56 + 22) / 100);
    let buyersOfProduct1 = this.allBuyers * buyersOfProduct1Percentage;
    console.log(`buyersOfProduct1: ${buyersOfProduct1}, buyersOfProduct1Percentage: ${buyersOfProduct1Percentage}`);

    // all buyers - buyers of product 1  + 11-44% of product 1 buyers = potential buyers of product 2 * 44-88% = buyers of product 2 
    let partOfBuyersOfProduct1Percentage = (Math.floor(Math.random() * 34 + 11) / 100);
    let buyersOfProduct2Percentage = (Math.floor(Math.random() * 45 + 44) / 100);
    let buyersOfProduct2 = (this.allBuyers - buyersOfProduct1 + (buyersOfProduct1 * partOfBuyersOfProduct1Percentage)) * buyersOfProduct2Percentage;
    console.log(`buyersOfProduct2: ${buyersOfProduct2}, buyersOfProduct2Percentage: ${buyersOfProduct2Percentage}`);

    // all buyers - buyers of product 1 - buyers of product 2 * 22-66% = buyers of product 3
    let buyersOfProduct3Percentage = (Math.floor(Math.random() * 45 + 22) / 100);
    let buyersOfProduct3 = (this.allBuyers - buyersOfProduct1 - buyersOfProduct2) * buyersOfProduct3Percentage;
    console.log(`buyersOfProduct3: ${buyersOfProduct3}, buyersOfProduct3Percentage: ${buyersOfProduct3Percentage}, allBuyers: ${this.allBuyers}, buyersOfProduct1: ${buyersOfProduct1}, buyersOfProduct2: ${buyersOfProduct2}`);

    console.log(`all real buyers: ${buyersOfProduct1 + buyersOfProduct2 + buyersOfProduct3};`);
  }

}
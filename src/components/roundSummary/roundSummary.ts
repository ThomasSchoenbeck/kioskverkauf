import { Component, Input, OnInit } from '@angular/core';

import { Events } from 'ionic-angular';

import { Product } from '../../models/products';
import { ProductInventory } from '../../models/productInventory';

@Component({
  selector: 'cmp-roundSummary',
  templateUrl: 'roundSummary.html',
  
})
export class RoundSummaryComponent implements OnInit {

  private dailyCosts: number;
  @Input() money: number;
  @Input() costs: number;
  @Input() inventory: ProductInventory[];
  @Input() products: Product[];
  @Input() roundNumber: number;
  private totalCosts: number;
  private earnings: number;
  private dailyBalance: number;
  private BuyersPerBuilding: { id:number, buyers: number, match: number, product: number[] }[]; // cannot assign [] because it does not fit the properties
  private allBuyers: number = 0;
  private sellings: {productId: number, productName: string, stock: number, newIn: number, amountSold: number, amountEarned: number}[];

  constructor(public events: Events) { 
    this.dailyCosts = 150;
  }

  roundStart() {
    //event set roundEnd = false;
  }

Buildings = [
    { id: 1, name: 'School'      , people: 400 , products: [1,2,3,4]  },
    { id: 2, name: 'Construction', people: 50  , products: [5,6,7]  },
    { id: 3, name: 'Dentist'     , people: 100 , products: [5,8,9,10] },
    { id: 4, name: 'Police'      , people: 100 , products: [5,6,7,12]  }
  ]


  ngOnInit() {
    console.log(`FinancesComponent: dailyCosts: ${this.dailyCosts}, money: ${this.money}`);
    console.log(JSON.stringify(this.Buildings));

    this.calcCosts();

    this.calcBuyers();

    this.calcEarnings();

    this.calcDailyBalance();

  }

  calcCosts() {
    this.totalCosts = this.costs + this.dailyCosts;

    console.log(`calcCosts(): this.totalCosts = ${this.totalCosts}`);
  }

  calcDailyBalance() {
    this.dailyBalance = this.earnings - this.totalCosts;

    console.log(`calcDailyBalance(): this.dailyBalance = ${this.dailyBalance} (earnings: ${this.earnings} - totalCosts: ${this.totalCosts})`);

    this.events.publish('earnings:update', {earnings: this.earnings, dailyBalance: this.dailyBalance});
  }

  calcBuyers() {
	
    let counter = 0;

    this.BuyersPerBuilding = [];
    
    this.Buildings.forEach( data => {

    //standard 10%
      this.BuyersPerBuilding.push({id: data.id, buyers: data.people*0.1, match: 0, product: []});
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
            this.BuyersPerBuilding[counter].product.push(data.products[j]);
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
      this.BuyersPerBuilding[counter].match = match;

      
      if (match == 1) {
        this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * 0.15;
      } else if (match == 2) {
        this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * 0.30;
      } else if (match == 3) {
        this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * 0.45;
      } else if (match == 4) {
        this.BuyersPerBuilding[counter].buyers = this.BuyersPerBuilding[counter].buyers + data.people * 0.60;
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
    this.earnings = 0;

    this.sellings = [];

    console.time("calc buildings");
    this.BuyersPerBuilding.forEach( building => {

      let match = building.match;
      let intermediateProducts: number[] = building.product;
      console.log(`intermediateProducts: ${JSON.stringify(intermediateProducts)}`);

      console.log(`Building(${building.id}): content of data.product: ${JSON.stringify(building.product)}, data.buyers: ${building.buyers}`);


      console.time("calc building product");
      building.product.forEach( product => {

        let buyersOfProduct: number = 0;
        let stock: number;
        let newIn: number;
        let maxBuyers: number;
        let productName: string;
        let amountEarned: number;
        let sellingFound: boolean = false;
        let price: number;

        for (let i = 0; i < building.buyers; i++) {
          let rand = intermediateProducts[Math.floor(Math.random() * intermediateProducts.length)];

          if (rand == product) {
            buyersOfProduct = buyersOfProduct + 1;
          }
        }
        console.log(`  Product ${product}: number of Buyers ${buyersOfProduct}`);

        for (let i = 0; i < this.inventory.length; i++) {
          if (product == this.inventory[i].id) {
            stock = this.inventory[i].amount;
            newIn = this.inventory[i].newIn;

            (stock < buyersOfProduct) ? maxBuyers = stock : maxBuyers = buyersOfProduct;

            this.inventory[i].amount = this.inventory[i].amount - maxBuyers; //remove amount from inventory based on sellings

            // break;
          }
        }

        for (let i = this.products.length; i--;) {
          if (this.products[i].id == product ) {
            productName = this.products[i].name;
            this.earnings = this.earnings + this.products[i].price_sell * maxBuyers;
            price = newIn * this.products[i].price_buy;
            // amountEarned = (this.products[i].price_sell * maxBuyers) - (newIn * this.products[i].price_buy);
            amountEarned = this.products[i].price_sell * maxBuyers;
            console.log(`  ${productName}, total earnings: ${this.earnings}, product earnings: ${this.products[i].price_sell * maxBuyers}, amountEarned: ${amountEarned}, price: ${price}`)
          }
        }

        if (this.sellings.length > 0) {
          for (let i = 0; i < this.sellings.length; i++) {
            if (this.sellings[i].productId === product && maxBuyers > 0) {
              console.log(`    selling found: updating product ${product}, amount (${this.sellings[i].amountSold}/${this.sellings[i].amountSold + maxBuyers}), amountEarned: (${this.sellings[i].amountEarned}/${this.sellings[i].amountEarned + amountEarned})`);
              console.log(`      selling stock change: old (${this.sellings[i].stock}) and new (${this.sellings[i].stock - maxBuyers})`)
              this.sellings[i].amountSold = this.sellings[i].amountSold + maxBuyers;
              this.sellings[i].amountEarned = this.sellings[i].amountEarned + amountEarned;
              this.sellings[i].stock = this.sellings[i].stock - maxBuyers;
              sellingFound = true;
              // break;
            }
          }
        }
        
        if ((this.sellings.length == 0 || !sellingFound) && maxBuyers > 0) {
          console.log(`    selling missing - '${productName}' from building ${building.id} with ${maxBuyers} buyers pushed`);
          stock = stock - maxBuyers;
          amountEarned = amountEarned - price;
          this.sellings.push({productId: product, productName: productName, stock: stock, newIn: newIn, amountSold: maxBuyers, amountEarned: amountEarned});
        }


        // intermediateProducts.splice(intermediateProducts.indexOf(product), 1); // remove calculated product from array
        intermediateProducts = intermediateProducts.filter(x => x !== product);
        building.buyers = building.buyers - maxBuyers; //remove buyers from building

        console.log(`Building(${building.id}): content of intermediateProducts: ${JSON.stringify(intermediateProducts)}, data.buyers: ${building.buyers}`);
        console.log(`Building(${building.id}): remaining buyers = ${building.buyers}, after product ${product}`);
        console.log(`--------------------------------------`);

      });
      console.timeEnd("calc building product");

    });
    console.timeEnd("calc buildings");

    console.log(`total earnings: ${this.earnings}`);
    this.events.publish('inventory:update', {inventory: this.inventory});

  }


}
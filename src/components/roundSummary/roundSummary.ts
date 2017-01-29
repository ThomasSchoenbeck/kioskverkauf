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
  private totalCosts: number;
  private earnings: number;
  private dailyBalance: number;
  private BuyersPerBuilding: {id:number, buyers: number, match: number}[]; // cannot assign [] because it does not fit the properties
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
      this.BuyersPerBuilding.push({id: data.id, buyers: data.people*0.1, match: 0});
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
      this.BuyersPerBuilding[counter].match = match;

      
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
    this.earnings = 0;

    this.sellings = [];

    this.BuyersPerBuilding.forEach( data => {

      let match = data.match;

      let buyersOfProduct1Percentage
        , buyersOfProduct1: number = 0
        , partOfBuyersOfProduct1Percentage
        , buyersOfProduct2Percentage
        , buyersOfProduct2: number = 0
        , buyersOfProduct3Percentage
        , buyersOfProduct3: number = 0
        , buyersOfProduct4Percentage
        , buyersOfProduct4: number = 0
        , stock: number = 0
        , maxBuyers1: number = 0
        , maxBuyers2: number = 0
        , maxBuyers3: number = 0
        , maxBuyers4: number = 0
        , j: number = 0
        , productName: string
        , newIn: number = 0
        , amountEarned: number = 0
        , sellingFound: boolean = false
        ;


      if (match == 1 || match > 1) {
        // all buyers * 22%-77%  = buyers of product 1 
        buyersOfProduct1Percentage = (Math.floor(Math.random() * 56 + 22) / 100);
        buyersOfProduct1 = Math.round(data.buyers * buyersOfProduct1Percentage);
        console.log(`Building: ${data.id}, buyersOfProduct1: ${buyersOfProduct1}, buyersOfProduct1Percentage: ${buyersOfProduct1Percentage}`);
        
        let productId = this.Buildings[data.id-1].products[0];
        for (let i = this.inventory.length; i--;) {
          if (productId == this.inventory[i].id) {
            stock = this.inventory[i].amount;
            j = i;
          }
        }

        if (buyersOfProduct1 > 0 ) {
          if (stock < buyersOfProduct1) {
            maxBuyers1 = stock;
          } else {
            maxBuyers1 = buyersOfProduct1;
          }
        }

        this.inventory[j].amount = this.inventory[j].amount - maxBuyers1;
        newIn = this.inventory[j].newIn;

        this.earnings = this.earnings + this.products[productId-1].price_sell * maxBuyers1;

        for (let i = this.products.length; i--;) {
          if (this.products[i].id == productId ) {
            productName = this.products[i].name;
          }
        }

        console.log(`this.sellings: ${JSON.stringify(this.sellings)}`);

        if (maxBuyers1 > 0) {
          amountEarned = (this.products[productId-1].price_sell * maxBuyers1) - (newIn * this.products[productId-1].price_buy);
          console.log(`maxBuyers1 bigger than 0: ${maxBuyers1} | amountEarned: ${amountEarned}`);

          if (this.sellings.length > 0) {
            for (let i = this.sellings.length; i--;) {
              console.log(`compare productId: this.sellings[i].productId: ${this.sellings[i].productId} === producId: ${productId}`);
              if (this.sellings[i].productId === productId) {
                console.log(`maxBuyers1: selling found: updating product ${productId}, amount (${this.sellings[i].amountSold}/${this.sellings[i].amountSold + maxBuyers1}), amountEarned: (${this.sellings[i].amountEarned}/${this.sellings[i].amountEarned + this.products[productId-1].price_sell * maxBuyers1})`);
                this.sellings[i].amountSold = this.sellings[i].amountSold + maxBuyers1;
                this.sellings[i].amountEarned = this.sellings[i].amountEarned + this.products[productId-1].price_sell * maxBuyers1;
                sellingFound = true;
                break;
              } else {
                console.log(`maxBuyers1: selling not found`);
                sellingFound = false;
              }
            }
          } else {
            sellingFound = false;
          }
          
          if (!sellingFound) {
            console.log(`maxBuyers1: selling pushed`);
            this.sellings.push({productId: productId, productName: productName, stock: stock, newIn: newIn, amountSold: maxBuyers1, amountEarned: amountEarned});
          }
        }
        
        console.log(`Building: ${data.id}, Product 1, stock: ${stock}, price: ${this.products[productId-1].price_sell} * buysers (${maxBuyers1}) = ${this.products[productId-1].price_sell * maxBuyers1}`);
      }

      if (match == 2 || match > 2) {
        // all buyers - buyers of product 1  + 11-44% of product 1 buyers = potential buyers of product 2 * 44-88% = buyers of product 2 
        partOfBuyersOfProduct1Percentage = (Math.floor(Math.random() * 34 + 11) / 100);
        buyersOfProduct2Percentage = (Math.floor(Math.random() * 45 + 44) / 100);
        buyersOfProduct2 = Math.round((data.buyers - buyersOfProduct1 + (buyersOfProduct1 * partOfBuyersOfProduct1Percentage)) * buyersOfProduct2Percentage);
        console.log(`Building: ${data.id}, buyersOfProduct2: ${buyersOfProduct2}, buyersOfProduct2Percentage: ${buyersOfProduct2Percentage}`);

        let productId = this.Buildings[data.id-1].products[1];
        for (let i = this.inventory.length; i--;) {
          if (productId == this.inventory[i].id) {
            stock = this.inventory[i].amount;
            j = i;
          }
        }

        if (buyersOfProduct2 > 0) {
          if (stock < buyersOfProduct2) {
            maxBuyers2 = stock;
          } else {
            maxBuyers2 = buyersOfProduct2;
          }
        }

        this.inventory[j].amount = this.inventory[j].amount - maxBuyers2;
        newIn = this.inventory[j].newIn;
        
        this.earnings = this.earnings + this.products[productId-1].price_sell * maxBuyers2;

        for (let i = this.products.length; i--;) {
          if (this.products[i].id == productId ) {
            productName = this.products[i].name;
          }
        }

        if (maxBuyers2 > 0) {
          amountEarned = (this.products[productId-1].price_sell * maxBuyers2) - (newIn * this.products[productId-1].price_buy);

          if (this.sellings.length > 0) {
            for (let i = this.sellings.length; i--;) {
              if (this.sellings[i].productId === productId) {
                console.log(`maxBuyers2: selling found: updating product ${productId}, amount (${this.sellings[i].amountSold}/${this.sellings[i].amountSold + maxBuyers2}), amountEarned: (${this.sellings[i].amountEarned}/${this.sellings[i].amountEarned + this.products[productId-1].price_sell * maxBuyers2})`);
                this.sellings[i].amountSold = this.sellings[i].amountSold + maxBuyers2;
                this.sellings[i].amountEarned = this.sellings[i].amountEarned + this.products[productId-1].price_sell * maxBuyers2;
                sellingFound = true;
                break;
              } else {
                console.log(`maxBuyers2: selling not found`);
                sellingFound = false;
              }
            }
          } else {
            sellingFound = false;
          }

          if (!sellingFound) {
            this.sellings.push({productId: productId, productName: productName, stock: stock, newIn: newIn, amountSold: maxBuyers2, amountEarned: amountEarned});
          }
        }
        
        console.log(`Building: ${data.id}, Product 2, stock: ${stock}, price: ${this.products[productId-1].price_sell} * buysers (${maxBuyers2}) = ${this.products[productId-1].price_sell * maxBuyers2}`);
      }

      if (match == 3 || match > 3) {
        // all buyers - buyers of product 1 - buyers of product 2 * 22-66% = buyers of product 3
        buyersOfProduct3Percentage = (Math.floor(Math.random() * 45 + 22) / 100);
        buyersOfProduct3 = Math.round((data.buyers - buyersOfProduct1 - buyersOfProduct2) * buyersOfProduct3Percentage);
        console.log(`Building: ${data.id}, buyersOfProduct3: ${buyersOfProduct3}, buyersOfProduct3Percentage: ${buyersOfProduct3Percentage}, allBuyers: ${data.buyers}, buyersOfProduct1: ${buyersOfProduct1}, buyersOfProduct2: ${buyersOfProduct2}`);

        let productId = this.Buildings[data.id-1].products[2];
        for (let i = this.inventory.length; i--;) {
          if (productId == this.inventory[i].id) {
            stock = this.inventory[i].amount;
            j = i;
          }
        }

        if (buyersOfProduct3 > 0) {
          if (stock < buyersOfProduct3) {
            maxBuyers3 = stock;
          } else {
            maxBuyers3 = buyersOfProduct3;
          }
        }

        this.inventory[j].amount = this.inventory[j].amount - maxBuyers3;
        newIn = this.inventory[j].newIn;
        
        this.earnings = this.earnings + this.products[productId-1].price_sell * maxBuyers3;

        for (let i = this.products.length; i--;) {
          if (this.products[i].id == productId ) {
            productName = this.products[i].name;
          }
        }

        if (maxBuyers3 > 0) {
          amountEarned = (this.products[productId-1].price_sell * maxBuyers3) - (newIn * this.products[productId-1].price_buy);

          if (this.sellings.length > 0) {
            for (let i = this.sellings.length; i--;) {
              if (this.sellings[i].productId === productId) {
                console.log(`maxBuyers3: selling found: updating product ${productId}, amount (${this.sellings[i].amountSold}/${this.sellings[i].amountSold + maxBuyers3}), amountEarned: (${this.sellings[i].amountEarned}/${this.sellings[i].amountEarned + this.products[productId-1].price_sell * maxBuyers3})`);
                this.sellings[i].amountSold = this.sellings[i].amountSold + maxBuyers3;
                this.sellings[i].amountEarned = this.sellings[i].amountEarned + this.products[productId-1].price_sell * maxBuyers3;
                sellingFound = true;
                break;
              } else {
                console.log(`maxBuyers3: selling not found`);
                sellingFound = false
              }
            }
          } else {
            sellingFound = false;
          }

          if (!sellingFound) {
            this.sellings.push({productId: productId, productName: productName, stock: stock, newIn: newIn, amountSold: maxBuyers3, amountEarned: amountEarned});
          }
        }

        console.log(`Building: ${data.id}, Product 3, stock: ${stock}, price: ${this.products[productId-1].price_sell} * buysers (${maxBuyers3}) = ${this.products[productId-1].price_sell * maxBuyers3}`);
      }

      if (match == 4) {
        buyersOfProduct4Percentage = (Math.floor(Math.random() * 45 + 32) / 100);
        buyersOfProduct4 = Math.round((data.buyers - buyersOfProduct1 - buyersOfProduct2 - buyersOfProduct3) * buyersOfProduct4Percentage);
        console.log(`Building: ${data.id}, buyersOfProduct4: ${buyersOfProduct4}, buyersOfProduct4Percentage: ${buyersOfProduct4Percentage}, allBuyers: ${data.buyers}, buyersOfProduct1: ${buyersOfProduct1}, buyersOfProduct2: ${buyersOfProduct2}`);

        let productId = this.Buildings[data.id-1].products[3];
        for (let i = this.inventory.length; i--;) {
          if (productId == this.inventory[i].id) {
            stock = this.inventory[i].amount;
            j = i;
          }
        }

        if (buyersOfProduct4 > 0) {
          if (stock < buyersOfProduct4) {
            maxBuyers4 = stock;
          } else {
            maxBuyers4 = buyersOfProduct4;
          }
        }

        this.inventory[j].amount = this.inventory[j].amount - maxBuyers4;
        let newIn: number = this.inventory[j].newIn;

        this.earnings = this.earnings + this.products[productId-1].price_sell * maxBuyers4;

        for (let i = this.products.length; i--;) {
          if (this.products[i].id == productId ) {
            productName = this.products[i].name;
          }
        }
        
        if (maxBuyers4 > 0) {
          amountEarned = (this.products[productId-1].price_sell * maxBuyers4) - (newIn * this.products[productId-1].price_buy);

          if (this.sellings.length > 0) {
            for (let i = this.sellings.length; i--;) {
              if (this.sellings[i].productId === productId) {
                console.log(`maxBuyers4: selling found: updating product ${productId}, amount (${this.sellings[i].amountSold}/${this.sellings[i].amountSold + maxBuyers4}), amountEarned: (${this.sellings[i].amountEarned}/${this.sellings[i].amountEarned + this.products[productId-1].price_sell * maxBuyers4})`);
                this.sellings[i].amountSold = this.sellings[i].amountSold + maxBuyers4;
                this.sellings[i].amountEarned = this.sellings[i].amountEarned + this.products[productId-1].price_sell * maxBuyers4;
                sellingFound = true;
                break;
              } else {
                console.log(`maxBuyers4: selling not found`);
                sellingFound = false;
              }
            }
          } else {
            sellingFound = false;
          }

          if (!sellingFound) {
            this.sellings.push({productId: productId, productName: productName, stock: stock, newIn: newIn, amountSold: maxBuyers4, amountEarned: amountEarned});
          }
        }


        console.log(`Building: ${data.id}, Product 4, stock: ${stock}, price: ${this.products[productId-1].price_sell} * buysers (${maxBuyers4}) = ${this.products[productId-1].price_sell * maxBuyers4}`);

      }

      console.log(`Building: ${data.id}, all possible buyers: ${buyersOfProduct1 + buyersOfProduct2 + buyersOfProduct3 + buyersOfProduct4}, all real buyers: ${maxBuyers1 + maxBuyers2 + maxBuyers3 + maxBuyers4}`);

    });

    console.log(`total earnings: ${this.earnings}`);
    this.events.publish('inventory:update', {inventory: this.inventory});

  }


}
import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/products';
import { ProductInventory } from '../../models/productInventory';

import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

@Component({
  selector: 'cmp-inventory',
  templateUrl: 'inventory.html',
  
})
export class InventoryComponent implements OnInit {

  public productInventory: ProductInventory[];
  private productInventoryIds: number[];
  private checkoutValue: any;
  private money: number;

  constructor(private savegameProvider: SavegameProvider) { }

//  heroes = [
//     new Hero(1, 'Windstorm'),
//     new Hero(13, 'Bombasto'),
//     new Hero(15, 'Magneta'),
//     new Hero(20, 'Tornado')
//   ];

  products = [
    new Product( 1, 'Saft', 0.80, 1.00, 0 ),
    new Product( 2, 'Sprudel/Wasser', 0.70, 0.90, 0),
    new Product( 3, 'Bier', 1.00, 1.50, 0 ),
    new Product( 4, 'Smoothy', 2.20, 2.60, 0 ),
    new Product( 5, 'Kaffee', 0.50, 1.00, 0 ),
    new Product( 6, 'Süßigkeiten', 0.70, 0.90, 0 ),
    new Product( 7, 'Brötchen', 0.70, 1.00, 0 ), 
    new Product( 8, 'Cola', 0.64, 0.89, 0 ),
    new Product( 9, 'Eis', 0.70, 1.20, 0 ),
    new Product( 10, 'Zeitungen', 1.55, 1.80, 0 ),
    new Product( 11, 'Zeitschriften', 1.70, 2.10, 0 ),
    new Product( 12, 'Salat', 2.50, 2.99, 0 ),
  ]

  calcMoneyToSpend(amount, product: Product) {
    let price = amount * product.price_buy; 
    console.log(`Inventory: calcMoneyToSpend(): for product: ${product.name}, old amount: ${product.amount}, new amount: ${product.amount + amount}, price: ${price}`)
    this.checkoutValue.push({productId: product.id, amount: amount, price: price});
    console.log(this.checkoutValue);
  }

  loadInventoryFromSavegame() {
    try {
      console.log(`Inventory: accessing savegame from provider: ${JSON.stringify(this.savegameProvider.savegame)}`);
      this.productInventory = this.savegameProvider.savegame.inventory;
      let productIndex;


      this.productInventory.forEach(data => {
        // productIndex = this.products.indexOf(data.id); 
        //http://jsfiddle.net/gJPHw/
        productIndex = this.products.filter(data2 => {
          data2.id === data.id;
        });

        this.products[productIndex].amount = data.amount; // set amount of products in the template

        this.productInventoryIds.push(data.id);
      });
    } catch(error) {
      console.log(`Inventory: cannot load inventory from savegame, it is empty. Probably new savegame!`);
      console.log(`Inventory: setting empty!`);
      
    }
  } //how to save current Amount of dynamic Product list? create array?

  loadMoneyFromSavegame() {
    this.money = this.savegameProvider.savegame.inventory;
    console.log(`Inventory: loadMoneyFromSavegame(): money: ${this.money}`);
  }

  checkout() {
    let moneyToSpend: number;
    this.checkoutValue.forEach(data => {
      moneyToSpend = moneyToSpend + data.price;
      let productIndex = this.productInventoryIds.indexOf(data.productId); 
      if (productIndex > -1) {
        this.productInventory[productIndex].amount = this.productInventory[productIndex].amount + data.amount;
        this.products[productIndex].amount = this.products[productIndex].amount + data.amount;
        console.log(`Inventory: checkout(): adding amount(${data.amount}) after buy for ${this.products[productIndex].name}(${this.products[productIndex].id})/${this.productInventory[productIndex].id} `)
      }
    });

    console.log(`Inventory: checkout(): spending ${moneyToSpend} from ${this.money} = ${this.money - moneyToSpend}`);
    this.money = this.money - moneyToSpend;
  }

  ngOnInit() {
    this.loadInventoryFromSavegame();
    this.loadMoneyFromSavegame();
  }

}
import { Component, OnInit, Input } from '@angular/core';

import { AlertController, Events } from 'ionic-angular';

import { Product } from '../../models/products';
import { ProductInventory } from '../../models/productInventory';

import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

@Component({
  selector: 'cmp-inventory',
  templateUrl: 'inventory.html',
  
})
export class InventoryComponent implements OnInit {

  public productInventory: ProductInventory[] = [];
  private productInventoryIds: number[] = [];
  private productInCheckout: number[] = [];
  private checkoutValue: any = [];
  private money: number = 0;
  private moneyToSpend: number = 0;
  @Input() isLoadedSavegame: boolean;
  @Input() inventory: ProductInventory[];
  @Input() moneyFromCurrentGame: number;

  constructor(private savegameProvider: SavegameProvider, public events: Events, private alertCtrl: AlertController) { }

  // some products can only be bought and sold when a specific upgrade is available
  // [locked, unlocked] attribute for the products that need first a upgrade to unlock them
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
    let price: number = amount * product.price_buy; 
    console.log(`Inventory: calcMoneyToSpend(): for product: ${product.name}, old amount: ${product.amount}, new amount: ${product.amount + amount}, price: ${price}`)
    let index = this.productInCheckout.indexOf(product.id);
    if (index > -1) {
      console.log(`Inventory: calcMoneyToSpend(): product(${product.id}) already in the array.`);
      this.checkoutValue[index].amount = +this.checkoutValue[index].amount + amount; 
      this.checkoutValue[index].price = Math.round((+this.checkoutValue[index].price + price) * 100) / 100; 
    } else {
      this.productInCheckout.push(product.id);
      this.checkoutValue.push({productId: product.id, amount: amount, price: price});
    }

    console.log(this.productInventoryIds);
    index = this.productInventoryIds.indexOf(product.id);
    if (index == -1) {
      console.log(`Inventory: calcMoneyToSpend(): index of productInventoryIds = ${index}`);

      let productIndex;

      for (let i=this.products.length; i--; ) {
        ///console.log(`i(${i}) = id: ${this.products[i].id} compared to product.id(${product.id})`);
        if (this.products[i].id === product.id) {
          productIndex = i;
          break;
        }
      }

      // productIndex = this.products.filter(value => {
      //   console.log(`filter products: compare id ${value.id} to ${product.id}`);
      //   value.id === product.id;
      // });

      console.log(`index in products is ${productIndex}`);
  
      this.productInventoryIds[productIndex] = product.id;

    }

    //console.log(this.checkoutValue);
    console.log(`Inventory: calcMoneyToSpend(): moneyToSpend: ${this.moneyToSpend} + price: ${price}`);
    this.moneyToSpend = Math.round((this.moneyToSpend + price) * 100) / 100;
  }

  // loadInventoryFromSavegame() {
  //   try {
  //     console.log(`Inventory: accessing savegame from provider: ${JSON.stringify(this.savegameProvider.savegame)}`);
  //     this.productInventory = this.savegameProvider.savegame.inventory;
  //     let productIndex;


  //     this.productInventory.forEach(data => {
  //       // productIndex = this.products.indexOf(data.id); 
  //       //http://jsfiddle.net/gJPHw/
  //       productIndex = this.products.filter(data2 => {
  //         data2.id === data.id;
  //       });

  //       // console.log(``);
  //       this.products[productIndex].amount = data.amount; // set amount of products in the template

  //       this.productInventoryIds.push(data.id);
  //     });
  //   } catch(error) {
  //     console.log(`Inventory: cannot load inventory from savegame, it is empty. Probably new savegame!`);
  //     console.log(`Inventory: setting empty!`);
  //     this.productInventory = [];
  //   }
  // } //how to save current Amount of dynamic Product list? create array?

  // loadMoneyFromSavegame() {
  //   this.money = this.savegameProvider.savegame.money;
  //   console.log(`Inventory: loadMoneyFromSavegame(): money: ${this.money}`);
  // }

  loadInventoryFromCurrentGame() {
    console.log(`Inventory: loadInventoryFromCurrentGame()`);
    //console.log(this.inventory);

    this.productInventory = this.inventory;

    try {
      if (this.productInventory.length > 0) {
        let productIndex;
        this.productInventory.forEach(data => {
          for (let i=this.products.length; i--; ) {
            //console.log(`i(${i}) = id: ${this.products[i].id} compared to product.id(${data.id})`);
            if (this.products[i].id === data.id) {
              productIndex = i;
              break;
            }
          }

          //console.log(`productIndex = ${productIndex}, this.products: ${JSON.stringify(this.products)}`);

          this.products[productIndex].amount = data.amount;
          this.productInventoryIds.push(data.id);
        });
      }
    } catch (error) {
      console.warn(`Inventory: Probably new savegame: Inventory is empty, has no length: ${error}`);
      //console.log(this.productInventory);
      this.productInventory = [];
      this.events.publish('inventory:update', {inventory: this.productInventory});
    }
  }

  loadMoneyFromCurrentGame() {
    this.money = this.moneyFromCurrentGame;
    console.log(`Inventory: loadMoneyFromCurrentGame(): money: ${this.money}`);
  }

  resetCheckout() {
     let alert = this.alertCtrl.create({
      title: 'Delete shopping cart?',
      message: 'Do you really want to empty your shopping cart again?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Empty',
          handler: () => {
            console.log('Empty clicked');
            this.checkoutValue = [];
            this.moneyToSpend = 0;
            this.productInCheckout = [];
          }
        }
      ]
    });
    alert.present();
  }


  checkout() {
    if (this.checkoutValue.length != 0) {
      this.checkoutValue.forEach(data => {
        // this.moneyToSpend = this.moneyToSpend + data.price;
        // console.log(`productInventoryIds`);
        // console.log(this.productInventoryIds);
        // console.log(`this.productInventory`);
        // console.log(this.productInventory);
        let productIndex = this.productInventoryIds.indexOf(data.productId); 
        console.log(`Inventory: checkout(): data.productId: ${data.productId} productIndex: ${productIndex}, checkoutValue: ${JSON.stringify(data)}`);
        if (productIndex > -1) {
          if (this.productInventory[productIndex] != undefined && this.productInventory[productIndex].id == data.productId) {
            console.log(`Inventory: checkout(): product found in savegame inventory.`);
            this.productInventory[productIndex].amount = this.productInventory[productIndex].amount + data.amount;
            this.productInventory[productIndex].newIn = data.amount;
          } else {
            console.log(`Inventory: checkout(): product not in savegame inventory. pushing (${data.productId}|${data.amount})`);
            // console.log(this.productInventory);
            this.productInventory.push({ id: data.productId, amount: data.amount, newIn: data.amount});
            // console.log(`pushed!`);
          }
          this.products[productIndex].amount = this.products[productIndex].amount + data.amount;
          console.log(`Inventory: checkout(): adding amount(${data.amount}) after buy for ${this.products[productIndex].name}(${this.products[productIndex].id})/${data.productId}`);
        }
      });

      console.log(`Inventory: checkout(): spending ${this.moneyToSpend} from ${this.money} = ${this.money - this.moneyToSpend}`);
      this.money = Math.round((this.money - this.moneyToSpend) * 100) / 100;

      // this.checkoutValue = [];
      // this.moneyToSpend = 0;
      // this.productInCheckout = [];
      this.resetCheckout();

      this.saveProgress();

    } else {
      console.log(`Inventory: checkout(): nothing to buy selected.`);
    }
  }

  saveProgress() {
    this.events.publish('inventory:changed', {inventory: this.productInventory, money: this.money, moneyToSpend: this.moneyToSpend});
    // this.savegameProvider.setSavegame().then();
  }

  confirmBuying() {
    if (this.checkoutValue.length != 0) {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to spend ' + this.moneyToSpend + ' for restocking your shop?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
            this.checkout();
          }
        }
      ]
    });
    alert.present();
    } else {
      console.log(`Alert not shown. Nothing selected.`);
    }
  }

  ngOnInit() {
    console.log(`Inventory: ngOnInit()`);
    // if (this.isLoadedSavegame) {
      // this.loadInventoryFromSavegame();
      // this.loadMoneyFromSavegame();
    // } else {
      this.loadInventoryFromCurrentGame();
      this.loadMoneyFromCurrentGame();
    // }
  }

}
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { NavController, Events, Content, NavParams } from 'ionic-angular';

import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

import { Product } from '../../models/products';
import { ProductInventory } from '../../models/productInventory';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage implements OnInit, AfterViewInit {

  @ViewChild(Content) content: Content;

  private selectedCity: string;
  private selectedShop: string;
  private saveSlot: string;
  private gameStarted: boolean = false;
  private shopping: boolean = false;
  // private savegame: Savegame;
  private gameRound: number;
  private roundEnd: boolean;

  // properties from InventoryComponent
  private isLoadedSavegame: boolean;
  private inventory: ProductInventory[];
  private earnings: number;
  private money: number;
  private roundCosts: number = 0;
  private dailyBalance: number;

  private gameTabs: string = "inventory";


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

  constructor(public navCtrl: NavController, public events: Events, private navParams: NavParams, private savegameProvider: SavegameProvider) {
    this.selectedCity = navParams.get('selectedCity').toString();
    this.selectedShop = navParams.get('selectedShop').toString();
    this.saveSlot = navParams.get('saveSlot').toString();
    this.isLoadedSavegame = navParams.get('isLoadedSavegame');
    this.money = navParams.get('money');
    this.gameRound = navParams.get('round');
    this.inventory = navParams.get('inventory');

    console.log(`GamePage: isLoadedSavegame: ${this.isLoadedSavegame}, money: ${this.money}, inventory: ${this.inventory}`);

    this.events.subscribe('inventory:changed', (eventData) => {
      console.log(`GamePage: Inventory has changed! ${JSON.stringify(eventData)}`);
      this.inventory = eventData[0].inventory;
      this.money = eventData[0].money;
      this.roundCosts = this.roundCosts + eventData[0].moneyToSpend;
      console.log(`roundCosts: ${this.roundCosts}`);
      this.isLoadedSavegame = false;
    });

    this.events.subscribe('inventory:update', (eventData) => {
      console.log(`GamePage: (update) Inventory has changed! ${JSON.stringify(eventData)}`);
      this.inventory = eventData[0].inventory;
    });

    this.events.subscribe('earnings:update', (eventData) => {
      console.log(`GamePage: (update) Earnings has changed! ${JSON.stringify(eventData)}`);
      this.earnings = eventData[0].earnings;
      this.dailyBalance = eventData[0].dailyBalance;      
    });

  }

  updateMoney() {
    this.money = this.money + this.dailyBalance;
  }

  // createSaveGame(): Promise<boolean> {
  //   console.log(`GamePage: creating savegame. City: ${this.selectedCity}, Shop: ${this.selectedShop}, Slot: ${this.saveSlot}`);

  //   //slot, city, shop, buildings, round, money, inventory, upgrades
  //   return this.savegameProvider.setSavegame(this.saveSlot, new Savegame(this.saveSlot, this.selectedCity, this.selectedShop, '', 0, 10000, {}, '')).then(() => {
  //       console.log(`GamePage: savegame created!`);
  //     });
  // }

  // setPropertiesFromSavegame(): Promise<boolean> {
  setPropertiesFromSavegame() {
    console.log(`GamePage: setPropertiesFromSavegame()`);
    this.gameRound = this.savegameProvider.savegame.round;
    if (this.gameRound == undefined) {
      this.gameRound = 1;
      console.log(`GamePage: gameRound undefined, setting to ${this.gameRound}`);
    }
    this.saveSlot = this.savegameProvider.savegame.slot;
    this.selectedCity = this.savegameProvider.savegame.city;
    this.selectedShop = this.savegameProvider.savegame.shop;
    // return true;
  }

  updateSaveGame() {
    //needs to collect data from several pages, components or services.

  }

  nextGameRound() {
    let roundCounter: number = 0; //increase

    //shop checkout
  }

  removePageFromNav() {
    console.log(`GamePage: previous page in navStack was: ${this.navCtrl.getByIndex(1).component.name}. will be removed now.`);
    this.navCtrl.remove(1,1).then(event => {
      console.log(`GamePage: Page has been removed form navStack: ${event}`);
      console.log(event);
    }); // does not work well
  }

  endRound() {
    console.log(`GamePage: endRound()`);
    // calc sellings - done in roundSummary component

    // set boolean for showing roundSummary component
    this.roundEnd = true;
  }

  nextRound() {
    console.log(`GamePage: nextRound()`);

    this.roundCosts = 0;
    this.updateMoney();

    //increase round number
    this.gameRound = this.gameRound + 1;

    // set boolean for showing roundSummary component
    this.roundEnd = false;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.removePageFromNav();
    // if (!this.isLoadedSavegame) {
    //   // this.createSaveGame().then(() => {
    //   // });
    // } else {
    //   this.setPropertiesFromSavegame();
    // }

  }

}
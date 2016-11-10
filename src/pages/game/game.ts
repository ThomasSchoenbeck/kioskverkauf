import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { NavController, Events, Content, NavParams } from 'ionic-angular';

import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

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

  // properties from InventoryComponent
  private isLoadedSavegame: boolean;
  private inventory: ProductInventory[];
  private money: number;

  private gameTabs: string = "inventory";

  constructor(public navCtrl: NavController, public events: Events, private navParams: NavParams, private savegameProvider: SavegameProvider) {
    this.selectedCity = navParams.get('selectedCity').toString();
    this.selectedShop = navParams.get('selectedShop').toString();
    this.saveSlot = navParams.get('saveSlot').toString();
    this.isLoadedSavegame = navParams.get('isLoadedSavegame');
    this.money = navParams.get('money');
    this.inventory = navParams.get('inventory');

    console.log(`GamePage: isLoadedSavegame: ${this.isLoadedSavegame}, money: ${this.money}, inventory: ${this.inventory}`);

    this.events.subscribe('inventory:changed', (eventData) => {
      console.log(`GamePage: Inventory has changed! ${JSON.stringify(eventData)}`);
      this.inventory = eventData[0].inventory;
      this.money = eventData[0].money;
      this.isLoadedSavegame = false;
    });

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
    this.gameRound = this.savegameProvider.savegame.round;
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
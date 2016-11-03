import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { NavController, Events, Content, NavParams } from 'ionic-angular';

import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage implements AfterViewInit {

  @ViewChild(Content) content: Content;

  private selectedCity: string;
  private selectedShop: string;
  private saveSlot: string;
  private gameStarted: boolean = false;
  private shopping: boolean = false;
  // private savegame: Savegame;
  private gameRound: number;
  private isLoadedSavegame: boolean;

  private gameTabs: string = "inventory";

  constructor(public navCtrl: NavController, public events: Events, private navParams: NavParams, private savegameProvider: SavegameProvider) {
    this.selectedCity = navParams.get('selectedCity').toString();
    this.selectedShop = navParams.get('selectedShop').toString();
    this.saveSlot = navParams.get('saveSlot').toString();
    this.isLoadedSavegame = navParams.get('isLoadedSavegame');
  }


  createSaveGame() {
    console.log(`GamePage: creating savegame. City: ${this.selectedCity}, Shop: ${this.selectedShop}, Slot: ${this.saveSlot}`);

    this.savegameProvider.setSavegame(this.saveSlot, new Savegame(this.saveSlot, this.selectedCity, this.selectedShop, '', 0, 10000, '', ''));
  }

  setPropertiesFromSavegame() {
    this.gameRound = this.savegameProvider.savegame.round;
    this.saveSlot = this.savegameProvider.savegame.slot;
    this.selectedCity = this.savegameProvider.savegame.city;
    this.selectedShop = this.savegameProvider.savegame.shop;
  }

  updateSaveGame() {
    //needs to collect data from several pages, components or services.

  }

  nextGameRound() {
    let roundCounter: number = 0; //increase

    //shop checkout
  }

  ngAfterViewInit() {
    console.log(`GamePage: previous page in navStack was: ${this.navCtrl.getByIndex(1).component.name}. will be removed now.`);
    this.navCtrl.remove(1,1).then(event => {
      console.log(`GamePage: Page has been removed form navStack: ${event}`);
      console.log(event);
    }); // does not work well

    if (!this.isLoadedSavegame) {
      this.createSaveGame();
    } else {
      this.setPropertiesFromSavegame();
    }
  }

}
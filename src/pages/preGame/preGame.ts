import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController, Events, Content } from 'ionic-angular';

import { GamePage } from '../game/game';
import { SettingsProvider } from '../../providers/settings';

import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

@Component({
  selector: 'page-preGame',
  templateUrl: 'preGame.html'
})
export class PreGamePage implements OnInit {

  @ViewChild(Content) content: Content;

  private selectedCity: string;
  private selectedShop: any;
  private saveSlot: string;
  private gameStarted: boolean = false;
  private hideGameIntro: boolean;

  constructor(public navCtrl: NavController, public events: Events, private settingsProvider: SettingsProvider, private savegameProvider: SavegameProvider) {

    this.events.subscribe('saveSlot:selected', (eventData) => {
      console.log(`PreGamePage: Saveslot ${eventData[0].value} has been selected! ${JSON.stringify(eventData)}`);
      this.saveSlot = eventData[0].value;
    });

    this.events.subscribe('city:selected', (eventData) => {
    // userEventData is an array of parameters, so grab our first and only arg
      console.log(`PreGamePage: City has been selected! ${eventData}`);
      // this.selectedCity = eventData[0];
      // console.log(eventData);
      this.selectedCity = eventData;
      (this.hideGameIntro == true) ? this.goToGamePage() : console.log(`showing intro`);
      //i still need to fill the shop without the event
    });

    this.events.subscribe('shop:selected', (eventData) => {
      console.log(`PreGamePage: Shop has been selected! ${JSON.stringify(eventData)}`);

      this.selectedShop = eventData[0].shopHeadline;

      this.createSaveGame().then(() => {
        this.goToGamePage();
      });

      
      // this.navCtrl.push(GamePage, { //http://www.joshmorony.com/a-simple-guide-to-navigation-in-ionic-2/
      //   selectedCity: this.selectedCity,
      //   selectedShop: eventData
      // });

      // this.gameStarted = !this.gameStarted;
      // this.content.resize();
    });

  }

  ngOnInit() {
    this.settingsProvider.getHideGameIntro().then(data => {
      this.hideGameIntro = data;
    });
  }

  createSaveGame(): Promise<boolean> {
    console.log(`PreGamePage: creating savegame. City: ${this.selectedCity}, Shop: ${this.selectedShop}, Slot: ${this.saveSlot}`);
    //slot, city, shop, buildings, round, money, inventory, upgrades
    return this.savegameProvider.setSavegame(this.saveSlot, new Savegame(this.saveSlot, this.selectedCity, this.selectedShop, '', 0, 10000, {}, '')).then(() => {
        console.log(`PreGamePage: savegame created!`);
      });
  }

  goToGamePage() {
    console.log(`PreGamePage: goToGamePage(): selectedCity: ${this.selectedCity}, selectedShop: ${this.selectedShop}, saveSlot: ${this.saveSlot}`);
    this.navCtrl.push(GamePage, {
      selectedCity: this.selectedCity,
      selectedShop: this.selectedShop,
      saveSlot: this.saveSlot,
      isLoadedSavegame: false
    });
  }

  // setSelectedCity(city) {
  //   this.selectedCity = city;
  // }

}
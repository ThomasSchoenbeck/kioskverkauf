import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController, Events, Content } from 'ionic-angular';

import { GamePage } from '../game/game';
import { SettingsProvider } from '../../providers/settings';

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

  constructor(public navCtrl: NavController, public events: Events, private settingsProvider: SettingsProvider) {

    this.events.subscribe('saveSlot:selected', (eventData) => {
      console.log(`PreGamePage: Saveslot has been selected! ${eventData}`);
      this.saveSlot = eventData;
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
      console.log(`PreGamePage: Shop has been selected!`);

      this.selectedShop = eventData;

      this.goToGamePage();
      
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

  goToGamePage() {
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
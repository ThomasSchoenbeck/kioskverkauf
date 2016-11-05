import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';

import { GamePage } from '../game/game';
import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

@Component({
  selector: 'page-loadGame',
  templateUrl: 'loadGame.html'
})
export class LoadGamePage {

  private selectedCity: string;
  private selectedShop: any;
  private saveSlot: string;
  private savegame: Savegame;

  constructor(public navCtrl: NavController, public events: Events, private savegameProvider: SavegameProvider) {

    this.events.subscribe('saveSlot:selected', (slot) => {
      if (slot[0].filled) {
        console.log(`LoadGamePage: Saveslot ${slot.value} has been selected!`);
        this.saveSlot = slot[0].value;
        this.selectedCity = slot[0].city;
        this.selectedShop = slot[0].shop;
        // this.loadSaveGame().then(() => {
          this.goToGamePage();
        // })
      } else {
        console.log(`LoadGamePage: Slot ${slot[0].value} is empty. Do nothing!`);
      }
    });

  }

  // loadSaveGame():Promise<boolean> {
  //   return this.savegameProvider.getSavegame(this.saveSlot).then(data => {
  //     this.savegame = data;
  //     // return true;
  //   });
  // }

  goToGamePage() {
    console.log(`LoadGamePage: navigating to GamePage!`);
    this.navCtrl.push(GamePage, {
      selectedCity: this.selectedCity,
      selectedShop: this.selectedShop,
      saveSlot: this.saveSlot,
      isLoadedSavegame: true
    });
  }

}

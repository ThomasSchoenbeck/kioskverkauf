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

    this.events.subscribe('saveSlot:selected', (eventData) => {
      console.log(`LoadGamePage: Saveslot has been selected! ${eventData}`);
      this.saveSlot = eventData;
      this.loadSaveGame().then(() => {
        this.goToGamePage();
      })

    });

  }

  loadSaveGame():Promise<boolean> {
    return this.savegameProvider.getSavegame(this.saveSlot).then(data => {
      this.savegame = data;
      // return true;
    });
  }

  goToGamePage() {
    console.log(`LoadGamePage: navigating to GamePage!`);
    this.navCtrl.push(GamePage, {
      selectedCity: this.savegame.city,
      selectedShop: this.savegame.shop,
      saveSlot: this.saveSlot,
      isLoadedSavegame: true
    });
  }

}

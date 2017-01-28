import { Component } from '@angular/core';

import { NavController, Events, ToastController, AlertController } from 'ionic-angular';

import { GamePage } from '../game/game';
import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

import { ProductInventory } from '../../models/productInventory';

@Component({
  selector: 'page-loadGame',
  templateUrl: 'loadGame.html'
})
export class LoadGamePage {

  private selectedCity: string;
  private selectedShop: any;
  private saveSlot: string;
  private savegame: Savegame;
  private money: number;
  private round: number;
  private inventory: ProductInventory[];

  constructor(public navCtrl: NavController, public events: Events, private savegameProvider: SavegameProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {

    this.events.subscribe('saveSlot:selected', slot => {
      if (slot[0].filled) {
        console.log(`LoadGamePage: Saveslot ${slot[0].value} has been selected!`);
        this.saveSlot = slot[0].value;
        this.selectedCity = slot[0].city;
        this.selectedShop = slot[0].shop;
        this.money = slot[0].money;
        this.inventory = slot[0].inventory;
        this.round = slot[0].round;

        this.confirmLoadSavegame(slot[0]);

        // this.savegameProvider.activateSavegame(slot[0].value).then( () => {
        //   // success
        //   console.log(`LoadGamePage: subscribing to activate save game.`);
        //   this.goToGamePage()
        // });

      } else {
        console.log(`LoadGamePage: Slot ${slot[0].value} is empty. Do nothing!`);
        this.presentToast(slot[0].value);
      }
    });

  }

  presentToast(value) {
    let toast = this.toastCtrl.create({
      message: 'Saveslot ' + value + ' is empty!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  confirmLoadSavegame(slot) {
    let confirm = this.alertCtrl.create({
      title: 'Load Savegame?',
      message: `Do you want to load the savegame from ${slot.city}?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Load',
          handler: () => {
            console.log('Load clicked');
            this.savegameProvider.activateSavegame(slot.value).then( () => {
              // success
              console.log(`LoadGamePage: subscribing to activate save game.`);
              this.goToGamePage()
            });
          }
        }
      ]
    });
    confirm.present();
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
      money: this.money,
      inventory: this.inventory,
      round: this.round,
      isLoadedSavegame: true
    });
  }

}

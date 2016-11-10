import { Component, AfterViewInit } from '@angular/core';

import { AlertController, Events } from 'ionic-angular';

import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

@Component({
  selector: 'cmp-saveSlot',
  templateUrl: 'saveSlot.html',
  
})
export class SaveSlotComponent implements AfterViewInit {

  private selectedSaveSlot: string;
  private savegames: Savegame[] = [];

  constructor(public events: Events, private savegameProvider: SavegameProvider, private alertCtrl: AlertController) { }

  slots = [
    { id: 0, filled: false, name: 'SLOT A', value: 'A', city: undefined, shop: undefined, money: undefined},
    { id: 1, filled: false, name: 'SLOT B', value: 'B', city: undefined, shop: undefined, money: undefined},
    { id: 2, filled: false, name: 'SLOT C', value: 'C', city: undefined, shop: undefined, money: undefined},
    { id: 3, filled: false, name: 'SLOT D', value: 'D', city: undefined, shop: undefined, money: undefined},
    { id: 4, filled: false, name: 'SLOT E', value: 'E', city: undefined, shop: undefined, money: undefined}
  ]

  getSaveGameInfos() {
    let i = 0;

    this.slots.forEach(data => {
      this.savegameProvider.getSavegame(data.value).then(savegame => {
        if (savegame) {
          console.log(`saveSlot: set savegame into slot: ${data.value}`);
          let slot = data.value;
          this.slots[i].city = savegame.city;
          this.slots[i].shop = savegame.shop;
          this.slots[i].money = savegame.money;
          this.slots[i].filled = true;
          this.savegames.push(savegame);
        }
        i = i + 1;
      });
    });

    console.log(this.savegames);

  }

  clearSlot(value) {
    this.savegameProvider.removeSavegame(value).then( () => {
      for (let i = this.slots.length; i--;) {
        if (this.slots[i].value == value) {
          this.slots[i].city = '';
          this.slots[i].shop = '';
          this.slots[i].money = '';
          this.slots[i].filled = false;
        }
      }
    });
  }

  selectSaveSlot(slot) {
    // if (slot.filled) {
      // this.selectedSaveSlot = slot.value;
      console.log(`saveSlot: select save slot: ${slot.value}: ${JSON.stringify(slot)}`);
      this.events.publish('saveSlot:selected', slot);
    // } else {
    //   console.log(`saveSlot: Slot ${slot.value} is empty. Do nothing!`);
    // }
  }

  confirmDeletingSave(value) {
    let alert = this.alertCtrl.create({
      title: 'Confirm removal',
      message: 'Do you want to delete the Savegame from Slot ' + value + ' ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('savesSlot: confirmDeletingSave: Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('savesSlot: confirmDeletingSave: Delete clicked');
            this.clearSlot(value);
          }
        }
      ]
    });
    alert.present();
  }

  ngAfterViewInit() {
    this.getSaveGameInfos();
  }

}
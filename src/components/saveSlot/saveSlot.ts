import { Component, AfterViewInit } from '@angular/core';

import { Events } from 'ionic-angular';

import { Savegame } from '../../models/savegame';
import { SavegameProvider } from '../../providers/savegame';

@Component({
  selector: 'cmp-saveSlot',
  templateUrl: 'saveSlot.html',
  
})
export class SaveSlotComponent implements AfterViewInit {

  private selectedSaveSlot: string;
  private savegames: Savegame[] = [];

  constructor(public events: Events, private savegameProvider: SavegameProvider) { }

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

  selectSaveSlot(slot) {
    if (slot.filled) {
      this.selectedSaveSlot = slot.value;
      console.log(`select save slot: ${this.selectedSaveSlot}`);
      this.events.publish('saveSlot:selected', this.selectedSaveSlot);
    } else {
      console.log(`saveSlot: Slot is empty. Do nothing!`);
    }
  }

  ngAfterViewInit() {
    this.getSaveGameInfos();
  }

}
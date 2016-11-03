import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
// import { Observable } from 'rxjs/Observable';

import { Savegame } from '../models/savegame';

/*
  Generated class for the Settings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SavegameProvider {

  public savegame: Savegame;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Settings Provider');
  }

  getSavegame(slot): Promise<Savegame> {
    return this.storage.get('savegame' + slot).then((savegame) => {
      console.log(`GET: Savegame from slot ${slot}: ${savegame}`);
      this.savegame = savegame;
      return savegame;
    });
  }

  setSavegame(slot, savegame): void {
    this.storage.set('savegame' + slot, savegame).then(() => {
      console.log(`SET: Savegme from slot ${slot} is saved: ${savegame}`);
      this.savegame = savegame;
    });
  }

}

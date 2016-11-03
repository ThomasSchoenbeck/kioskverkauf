import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ActionSheetComponent } from '../actionsheet/actionsheet';

import { PreGamePage } from '../preGame/preGame';
import { LoadGamePage } from '../loadGame/loadGame';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private actionsheet: ActionSheetComponent) {

  }

  openMenu() {
    console.log(`Page Home: running openMenu`);
    this.actionsheet.openMenu();
  }


  openSettings() {
    this.navCtrl.push(SettingsPage);
  }


  loadGame() {
    this.navCtrl.push(LoadGamePage);
  }

  startGame() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(PreGamePage);
  }



}

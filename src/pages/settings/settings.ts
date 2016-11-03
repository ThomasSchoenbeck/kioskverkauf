import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SettingsProvider } from '../../providers/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {

  language: string = 'en';
  hideGameIntro: boolean = false;

  constructor(public navCtrl: NavController, public storage: Storage, private settingsProvider: SettingsProvider) {

  }

  ngOnInit() {

    this.settingsProvider.getLanguage().then(data => {
      this.language = data;
      console.log(`after storage call: ${this.language}`);
    });
    this.settingsProvider.getHideGameIntro().then(data => {
      this.hideGameIntro = data;
    });

  }

  setLanguage(value) {
    this.settingsProvider.setLanguage(value);
    // this.language //set and then this function is called, so no reason to set again.
  }

  setHideGameIntro(value) {
    this.settingsProvider.setHideGameIntro(value);
  }



// https://www.thepolyglotdeveloper.com/2016/08/using-sqlstorage-instead-sqlite-ionic-2-app/
// http://stackoverflow.com/questions/36696749/ionic-2-local-storage-not-working-as-expected/36702457#36702457


}

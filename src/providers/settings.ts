import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
// import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Settings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsProvider {

  public language: string;
  public hideGameIntro: boolean;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Settings Provider');
  }

  getLanguage(): Promise<string> {
    return this.storage.get('settingsLanguage').then((value) => {
      console.log('GET: Value of Language is: ' + value);
      this.language = value;
      return value;
    });
  }

  setLanguage(value): void {
    this.storage.set('settingsLanguage', value).then(() => {
      console.log('SET: Value of Language is: ' + value);
      this.language = value;
    });
  }

  getHideGameIntro(): Promise<boolean> {
    return this.storage.get('settingsHideGameIntro').then((value) => {
      console.log('GET: Value of HideGameIntro is: ' + value);
      this.hideGameIntro = value;
      return value;
    });
  }

  setHideGameIntro(value): void {
    this.storage.set('settingsHideGameIntro', value).then(() => {
      console.log('SET: Value of HideGameIntro is: ' + value);
      this.hideGameIntro = value;
    });
  }

}

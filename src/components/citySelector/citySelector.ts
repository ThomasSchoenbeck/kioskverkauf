import { Component, Output, EventEmitter } from '@angular/core';

// import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'cmp-citySelector',
  templateUrl: 'citySelector.html',
  
})
export class CitySelectorComponent {

  // @Output() setSelectedCity = new EventEmitter();

  // constructor(public navCtrl: NavController) {
    constructor(private alertCtrl: AlertController, public events: Events) {
  }

  presentConfirm(city: string) {
  let alert = this.alertCtrl.create({
    title: 'Confirm Selection',
    message: 'Do you want to start your Game in ' + city + '?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('CitySelectorComponent: Cancel clicked');
        }
      },
      {
        text: 'Select',
        handler: () => {
          console.log('CitySelectorComponent: Select clicked');
          // this.setSelectedCity.emit(city);
          this.events.publish('city:selected', city);
        }
      }
    ]
  });
  alert.present();
}

}

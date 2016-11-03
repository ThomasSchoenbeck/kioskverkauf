import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';


@Component({
  // template: `<ion-nav [root]="rootPage"></ion-nav>`
  template: `
<ion-menu [content]="content">

  <ion-toolbar>
    <ion-title>Pages</ion-title>
  </ion-toolbar>

  <ion-content>
    <ion-list class="listOfPages">
      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">
        {{p.title}}
      </button>
    </ion-list>
  </ion-content>

</ion-menu>

<ion-nav id="nav" [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`
})
export class MyApp implements OnInit {
  // rootPage = TabsPage;
  rootPage = HomePage;

  pages;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  ngOnInit() {
    this.pages = [ 
      {
        title: 'Game'
      },
      {
        title: 'Settings'
      },
      {
        title: 'Quit'
      }
    ]
  }
}

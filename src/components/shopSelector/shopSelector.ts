import { Component, Output, EventEmitter } from '@angular/core';

// import { NavController } from 'ionic-angular';
import { AlertController, Events } from 'ionic-angular';

@Component({
  selector: 'cmp-shopSelector',
  templateUrl: 'shopSelector.html',
  
})
export class ShopSelectorComponent {

  shopHeadline: string;
  shopText: string;
  shopImage: string;
  IMAGE_PATH: string = '../assets/image/'; 
  languageVar: string;

  mySlideOptions = {
    // initialSlide: 1,
    pager: true
  };

  // constructor(public navCtrl: NavController) {
  constructor(private alertCtrl: AlertController, public events: Events) {
    let x = Math.floor((Math.random() * 4) + 0);

    this.languageVar = 'en';

    // if (this.languageVar == 'en') {

    // }    
    console.log(this.shopTextPossibilities);

    // this.shopHeadline = this.shopTextPossibilities[this.languageVar].texts[x].headline;
    // this.shopText = this.shopTextPossibilities[this.languageVar].texts[x].text;
    // this.shopImage = this.shopTextPossibilities[this.languageVar].images[x].src;
    this.shopHeadline = this.shopTextPossibilities[0].texts[x].headline;
    this.shopText = this.shopTextPossibilities[0].texts[x].text;
    this.shopImage = this.shopTextPossibilities[0].images[x].src;

    this.slides[0].description = this.shopText; // set the first slide to be the random shop
    this.slides[0].image = this.shopImage; // set the first slide to be the random shop
  }

  gameStart() {
    console.log('CitySelectorComponent: Select clicked');
    this.events.publish('shop:selected', { shopHeadline: this.shopHeadline, shopText: this.shopText, shopImage: this.shopImage} );
  }

  shopHeadlinePossibilities = [
    {
      text: 'Shop 1', language: 'en'
    },
    {
      text: 'Shop 2', language: 'en'
    },
    {
      text: 'Shop 3', language: 'en'
    },
    {
      text: 'Shop 4', language: 'en'
    }
  ];

  shopTextPossibilities = [
    {
      language: 'en',
      texts: [
        { headline: 'Shop 1', text: 'This is shop 1. You got it for free. Have fun with it.' },
        { headline: 'Shop 2', text: 'This is shop 2. You bought it from your savings.' },
        { headline: 'Shop 3', text: 'This is shop 3. It was passed down from the family to you.' },
        { headline: 'Shop 4', text: 'This is shop 4. Build with your sweat. Btw. you have quit your management position at a multi million dollar company for this.' }
      ],
      images: [
        { src: this.IMAGE_PATH + 'Kiosk.jpg' },
        { src: this.IMAGE_PATH + 'kiosk06.jpg' },
        { src: this.IMAGE_PATH + 'kiosk-2000-680x383.jpg' },
        { src: this.IMAGE_PATH + 'kiosk-am-steinplatz_02.jpg' }
      ]
    },
    {
      language: 'de',
      texts: [
        { headline: 'Laden 1', text: 'Das ist Laden 1. You got it for free. Have fun with it.' },
        { headline: 'Laden 2', text: 'Das ist Laden 2. You bought it from your savings.' },
        { headline: 'Laden 3', text: 'Das ist Laden 3. It was passed down from the family to you.' },
        { headline: 'Laden 4', text: 'Das ist Laden 4. Build with your sweat. Btw. you have quit your management position at a multi million dollar company for this.' }
      ],
      images: [
        { src: this.IMAGE_PATH + 'kiosk-oettingenstr-1.JPG' },
        { src: this.IMAGE_PATH + 'p1000723_klein.jpg' },
        { src: this.IMAGE_PATH + 'image-1036951-breitwandaufmacher-uqfc-1036951.jpg' },
        { src: this.IMAGE_PATH + 'image-gross-mieten-50160-kerpengut-gehender-kiosk-u-id5k8w3o3qznjs.jpg' }
      ]
    },
    
  ];

  slides = [
    {
      title: "This is your Shop!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "../assets/image/ica-slidebox-img-1.png",
    },
    {
      title: "How to Play",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "../assets/image/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "../assets/image/ica-slidebox-img-3.png",
    }
  ];

  continue() {
    this.events.publish('shop:selected', true);
  }



}

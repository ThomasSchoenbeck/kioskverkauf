import { Component } from '@angular/core';

import { Events } from 'ionic-angular';

@Component({
  selector: 'cmp-roundSummary',
  templateUrl: 'roundSummary.html',
  
})
export class RoundSummaryComponent {

  constructor(public events: Events) { }

  roundStart() {
    //event set roundEnd = false;
  }

}
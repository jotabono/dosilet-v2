import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Globals } from '../../providers/globals';

@Component({
  selector: 'page-home',
  providers: [Globals],
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public globals: Globals) { }
}

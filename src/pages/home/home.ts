import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { CatalogPage } from '../catalog/catalog';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<{ title: string, component: any }>;
  
  constructor(public navCtrl: NavController) {

    this.pages = [
      { title: 'CATÁLOGO', component: CatalogPage },
      { title: 'CONTACTO', component: ContactPage }
    ];
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }
}

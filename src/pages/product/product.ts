import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { Transfer } from 'ionic-native';
import { LocalNotifications } from 'ionic-native';
import {InAppBrowser} from 'ionic-native';

declare var cordova: any;
declare var window: any;

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  taxonomies = [];
  products = [];
  dataTaxonomyUrl: string;
  dataProductUrl: string;
  parent_name: string;
  name: string;
  subtitle: string;
  description: HTMLElement;
  image: string;
  storageDirectory: string = '';

  constructor(public navCtrl: NavController, private http: Http, public params: NavParams, public loadingCtrl: LoadingController, public platform: Platform, public alertCtrl: AlertController) {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1500
    });
    loader.present();
    this.dataTaxonomyUrl = 'http://dosilet.deideasmarketing.solutions/wp-json/wp/v2/get_taxonomy_data_bycategory?idcategory=' + params.get("idCategory");
    this.dataProductUrl = 'http://dosilet.deideasmarketing.solutions/wp-json/wp/v2/get_products_bycategory?idcategory=' + params.get("idCategory");
    this.http.get(this.dataTaxonomyUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.taxonomies[0] = data[0];
        this.parent_name = (this.taxonomies[0].parent_name != null) ? this.taxonomies[0].parent_name : "";
        this.name = this.taxonomies[0].name;
        this.subtitle = this.taxonomies[0].subtitle;
        this.description = this.taxonomies[0].description;
      });
    this.http.get(this.dataProductUrl)
      .map(res => res.json())
      .subscribe(data => {
        for (var i = 0; i < data.length; i++) {
          console.log(data[i].image.url);
          this.image = (data[i].image != false && data[i].image.sizes.medium != "undefined") ? data[i].image.sizes.medium : "";
          this.products.push({ id: data[i].idproduct, image: this.image, name: data[i].product.post_title });
        }
        console.log(this.products);
      });

    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  openCatalogPDF() {
    window.open('http://dosilet.deideasmarketing.solutions/wp-content/uploads/2017/01/Diagrama-2-1.pdf', '_system', 'location=yes')
  }

  /*
    downloadFile() {
      this.platform.ready().then(() => {

        const fileTransfer = new Transfer();
        const file = 'http://dosilet.deideasmarketing.solutions/wp-content/uploads/2017/01/Diagrama-2-1.pdf';
        const fileLocation = cordova.file.dataDirectory;

        fileTransfer.download(file, fileLocation + 'catalogo.pdf').then((entry) => {
          LocalNotifications.schedule({
            id: 1,
            text: '¡Descarga completada!'
          });
        }, (error) => {
          LocalNotifications.schedule({
            id: 1,
            text: '¡Descarga fallida!'
          });
        });
      });
    }
    */
  openHome() {
    this.navCtrl.setRoot(HomePage);
  }
  goBack() {
    this.navCtrl.pop();
  }
  goContact() {
    this.navCtrl.push(ContactPage);
  }
}

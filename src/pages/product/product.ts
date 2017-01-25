import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import { Globals } from '../../providers/globals';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  taxonomies = [];
  products = [];
  dataTaxonomyUrl: string;
  dataProductUrl: string;
  parent_name : string;
  name : string;
  subtitle : string;
  description : HTMLElement;
  image:string;
  constructor(public navCtrl: NavController, private http: Http) {
    this.dataTaxonomyUrl = 'http://dosilet.deideasmarketing.solutions/wp-json/wp/v2/get_taxonomy_data_bycategory?idcategory=5';
    this.dataProductUrl = 'http://dosilet.deideasmarketing.solutions/wp-json/wp/v2/get_products_bycategory?idcategory=5';
    this.http.get(this.dataTaxonomyUrl)
      .map(res => res.json())
      .subscribe(data => {
        this.taxonomies[0] = data[0];
        this.parent_name = (this.taxonomies[0].parent_name != null)?this.taxonomies[0].parent_name:"" ;
        this.name = this.taxonomies[0].name;
        this.subtitle = this.taxonomies[0].subtitle;
        this.description = this.taxonomies[0].description;
      });
    this.http.get(this.dataProductUrl)
        .map(res => res.json())
        .subscribe(data => {
          for (var i = 0; i < data.length; i++) {
             console.log(data[i].image.url);
              this.image = (data[i].image.url != "undefined") ? data[i].image.url: "";
              this.products.push({ id: data[i].idproduct , image:this.image, name:data[i].product.post_title });
          }
          console.log(this.products);
        });
  }
}

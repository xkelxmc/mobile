import { Component } from '@angular/core';
import {NavParams, Platform, ViewController} from 'ionic-angular';

@Component({
  selector: 'modal-categories',
  templateUrl: 'categories.html',
})
export class ModalCategoriesOption {
  listCategory: any;
  category: number;
  categoryName: string;
  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.category = this.navParams.data.category;
      this.categoryName = this.navParams.data.categoryName;
      this.listCategory = this.navParams.data.listCategory;
    }
  }

  dismiss(id = this.category, name = this.categoryName) {
    this.viewCtrl.dismiss({id: id, name: name});
  }
}

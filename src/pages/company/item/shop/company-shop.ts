import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CompanyProvider} from "../../../../providers/company/company";
import {ShoppingCartPage} from "./cart/shopping-cart";


@IonicPage()
@Component({
  selector: 'company-shop',
  templateUrl: 'company-shop.html',
})
export class CompanyShopPage {

  categoryID: number;
  companyID: number;
  shopItems: any;
  shoppingCard: any;
  header: string = 'Товары';
  constructor(
    public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public company: CompanyProvider,
    public viewCtrl: ViewController) {

  }
  ngOnInit() {
    if (this.navParams.data) {
      this.categoryID = this.navParams.data.id;
      this.companyID = this.navParams.data.companyID;
      this.header = this.navParams.data.name;
      this.getCategoryItemsList();
      this.shoppingCard = this.company.getShoppingCard(this.companyID);

    }else{
      this.viewCtrl.dismiss();
    }
  }

  doRefresh(refresher) {
    this.getCategoryItemsList(() => refresher.complete());
  }

  getCategoryItemsList(complete = () => {}){
    this.company.getCompanyShopCategoriesItems(this.categoryID, this.companyID).then((result:any) => {
      this.shopItems = result;
      complete();
    }, (err) => {
      this.shopItems = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

  addToCart(itemId, price){
    this.shoppingCard = this.company.addToShoppingCard(itemId, this.companyID, price);
  }

  removeFromCart(itemId){
    this.shoppingCard = this.company.removeOneOrgFromShoppingCard(itemId, this.companyID);
  }

  openShoppingCart(){
    this.navCtrl.push(ShoppingCartPage, {companyID: this.companyID});
  }
}

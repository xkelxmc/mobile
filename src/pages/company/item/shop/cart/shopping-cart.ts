import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CompanyProvider} from "../../../../../providers/company/company";
import {AuthServiceProvider} from "../../../../../providers/auth-service/auth-service";
import {Common} from "../../../../../providers/common/common";
import {CompanyItemPage} from "../../item";
import {ShoppingOrderPage} from "../order/shopping-order";



@IonicPage()
@Component({
  selector: 'shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  userAuth: boolean;
  userData: any;
  userInfo: any;
  token: string;

  categoryID: number;
  companyID: number;
  shopItems: any;
  shopItemsIds: any = [];
  shoppingCard: any;
  header: string = 'Товары';
  constructor(
    public navCtrl: NavController,
    public app: App,
    public authService: AuthServiceProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public common: Common,
    public company: CompanyProvider,
    public viewCtrl: ViewController) {

  }
  ngOnInit() {
    if (this.navParams.data) {
      this.companyID = this.navParams.data.companyID;
      this.shoppingCard = this.company.getShoppingCard(this.companyID);
      if(this.shoppingCard && this.shoppingCard.items){
        let items = [];
        Object.keys(this.shoppingCard.items).map(function (objectKey, index) {
          items.push(objectKey);
        });
        this.shopItemsIds = items;
        this.checkAuth(() => {
          this.getCompanyShopItems();
        });
      }else{
        let alert = this.alertCtrl.create({
          title: 'Внимание',
          subTitle: 'Корзина товаров пуста',
          buttons: ['OK']
        });
        alert.present();
        this.viewCtrl.dismiss();
      }
    }else{
      this.viewCtrl.dismiss();
    }
  }

  checkAuth(callback) {
    this.userData = this.authService.getUserData();
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
  getCompanyShopItems(complete = () => {}){
    this.company.getCompanyShopItems(this.shopItemsIds, this.companyID).then((result:any) => {
      if (result && result.status == 'error') {
        let alert = this.alertCtrl.create({
          title: result.events[0].title,
          subTitle: result.events[0].text,
          buttons: ['OK']
        });
        alert.present();
        this.viewCtrl.dismiss();
      }
      this.shopItems = result;

      complete();
    }, (err) => {
      this.shopItems = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

  doRefresh(refresher) {
    this.getCompanyShopItems(() => refresher.complete());
  }
  addToCart(itemId, price){
    this.shoppingCard = this.company.addToShoppingCard(itemId, this.companyID, price);
  }
  openOrder(){
    this.navCtrl.push(ShoppingOrderPage, {id: this.companyID});
  }

  removeAll(){
    this.shoppingCard = this.company.removeAllFromShoppingCard(this.companyID);
    this.navCtrl.push(CompanyItemPage, {id: this.companyID});
  }
  removeFromCart(itemId){
    if (this.shoppingCard.items[itemId] !== undefined) {
      let count = this.shoppingCard.items[itemId].count;
      if (count === 1) {
        let alert = this.alertCtrl.create({
          title: 'Удалить?',
          message: 'Вы точно хотите удалить этот товар из корзины?',
          buttons: [
            {
              text: 'Закрыть',
              role: 'cancel',
            },
            {
              text: 'Удалить',
              handler: () => {
                this.shoppingCard = this.company.removeOneOrgFromShoppingCard(itemId, this.companyID);
                let index = this.shopItemsIds.indexOf(itemId);
                if (index > -1) {
                  this.shopItemsIds.splice(index, 1);
                }
                this.common.presentLoading();
                this.getCompanyShopItems(() => this.common.closeLoading());
              }
            }
          ]
        });
        alert.present();
      } else {
        this.shoppingCard = this.company.removeOneOrgFromShoppingCard(itemId, this.companyID);
      }
    }
  }
}

import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthServiceProvider} from "../../../../../providers/auth-service/auth-service";
import {Common} from "../../../../../providers/common/common";
import {UserMainProvider} from "../../../../../providers/user/main";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyProvider} from "../../../../../providers/company/company";
import {CompanyItemPage} from "../../item";

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'shopping-order-page',
  templateUrl: 'shopping-order.html',
})
export class ShoppingOrderPage {
  userAuth: boolean;
  userData: any;
  token: string;

  companyID: number;
  shopItemsIds: any = [];
  shopItemsIdsCount: any = [];
  shoppingCard: any;
  header: string = 'Заказ';

  paymentData = {"address": "", "room": "", "level": ""};
  checkForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public common: Common,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public company: CompanyProvider,
              public userMainService: UserMainProvider,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
    this.checkForm = this.formBuilder.group({
      address: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(128), Validators.required])],
      room: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(4), Validators.required])],
      level: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(4), Validators.required])],
    });
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.companyID = this.navParams.data.id;
      this.shoppingCard = this.company.getShoppingCard(this.companyID);
      console.log(this.companyID);
      console.log(this.shoppingCard);
      if(this.shoppingCard && this.shoppingCard.items){
        let items = [];
        let ids = [];
        let myCard = this.shoppingCard.items;
        Object.keys(myCard).map(function (objectKey, index) {
          items.push(objectKey);
          ids.push({id: objectKey, count: myCard[objectKey].count});
        });

        this.shopItemsIds = items;
        this.shopItemsIdsCount = ids;
        this.checkAuth();
      }
    }else{
      this.viewCtrl.dismiss();
    }
  }

  checkAuth(callback = () => {}) {
    this.userData = this.authService.getUserData();
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
  removeAll(){
    this.shoppingCard = this.company.removeAllFromShoppingCard(this.companyID);
    this.navCtrl.push(CompanyItemPage, {id: this.companyID});
  }

  createPayment(completeS = () => {}, complete_error = () => {}) {

    this.company.CompanyShopOrder(this.shopItemsIdsCount, this.companyID, this.paymentData.address, this.paymentData.room, this.paymentData.level, this.token).then((result: any) => {
      if (result && result.status == 'error') {
        let alert = this.alertCtrl.create({
          title: result.events[0].title,
          subTitle: result.events[0].text,
          buttons: ['OK']
        });
        alert.present();
        complete_error();
      }
      if(result && result.status == 'ok'){
        completeS();
      }
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: 'Не удалось установить связь с сервером',
        buttons: ['OK']
      });
      alert.present();
      complete_error();
    });
  }

  submitPayment(){
    this.common.presentLoading();
    this.createPayment(() => {
      this.common.closeLoading();
      this.removeAll();
    },() => {
      this.common.closeLoading();
    });
  }
}

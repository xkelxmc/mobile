import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {BuysProvider} from "../../../../providers/user/buys";
import {AuthServiceProvider} from "../../../../providers/auth-service/auth-service";
import {BuyStaffItemPage} from "./item/buy-staff-item";
import {Common} from "../../../../providers/common/common";

@Component({
  selector: 'buy-staff-list',
  templateUrl: 'buy-staff-list.html',
})
export class BuyStaffListPage {
  token: string;
  buyID: number;
  userAuth: boolean;
  staffList: any;
  buyInfo: any;
  parent: any;

  colors = {red: "#F93F3F", orange: "#F2A703", green: "#16B83C"};

  constructor(public platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public modalCtrl: ModalController,
              public buysService: BuysProvider,
              public common: Common,
              public viewCtrl: ViewController) {
  }

  checkAuth(callback) {
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.buyID = this.navParams.data.id;
      this.buyInfo = this.navParams.data.buy;
      this.parent = this.navParams.data.parent;
      this.checkAuth(() => {
        this.getBuysStaffList();
      });
    } else {
      this.dismiss();
    }
  }

  getBuysStaffList(complete = () => {
  }) {
    this.buysService.getBuysStaffList(this.token, this.buyID).then((result: any) => {
      this.staffList = result;
      if (result && result.status == 'error') {
        this.viewCtrl.dismiss();
      } else {
        if (this.staffList.data) {
          let length = this.staffList.data.length;
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              if (this.staffList.data[i].rating) {
                this.staffList.data[i].color = this.staffList.data[i].rating < 3 ? this.colors.red : this.staffList.data[i].color = this.staffList.data[i].rating < 4 ? this.colors.orange : this.colors.green;
              }
            }
          }
        }
      }
      complete();
    }, (err) => {
      this.viewCtrl.dismiss();
      complete();
    });
  }

  staffItem(id, data) {
    let modal = this.modalCtrl.create(
      BuyStaffItemPage, {
        id: id,
        staff: data,
        buy: this.buyInfo
      });
    modal.onDidDismiss(data => {
      if (data.change) {
        this.common.presentLoading();
        this.getBuysStaffList(() => this.common.closeLoading());
      }
    });
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
    this.parent.viewCtrl.dismiss({change: this.parent.buyRatingSending});
  }
}

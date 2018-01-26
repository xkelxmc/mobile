import { Component } from '@angular/core';
import {App, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthServiceProvider} from "../../../../providers/auth-service/auth-service";
import {Common} from "../../../../providers/common/common";
import {UserMainProvider} from "../../../../providers/user/main";
import {BusinessPaymentsEnterDataModel} from "./enter_data/payments_enter_data";

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-payments-types-cash-out',
  templateUrl: 'payments_cash_out.html',
})
export class BusinessPaymentsCashOutModal {
  userAuth: boolean;
  userData: any;
  token: string;

  paymentsList: any;
  constructor(public navCtrl: NavController,
              public app: App,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public authService: AuthServiceProvider,
              public common: Common,
              public userMainService: UserMainProvider,
              public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.checkAuth(() => {
      this.getBusinessPaymentsTypesList();
    });
  }
  dismiss() {
    this.viewCtrl.dismiss({change: false});
  }
  getBusinessPaymentsTypesList(complete = () => {}) {
    this.userMainService.getBusinessPaymentsTypes(this.token).then((result) => {
      this.paymentsList = result;
      complete();
    }, (err) => {
      this.paymentsList = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }
  checkAuth(callback) {
    this.userData = this.authService.getUserData();
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
  doRefresh(refresher) {
    this.getBusinessPaymentsTypesList(() => refresher.complete());
  }
  openEnterModal(id, type) {
    let modal = this.modalCtrl.create(
      BusinessPaymentsEnterDataModel, {
        id: id,
        type: type,
        parent: this
      });
    modal.present();
  }

}

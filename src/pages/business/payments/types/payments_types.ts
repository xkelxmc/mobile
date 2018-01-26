import { Component } from '@angular/core';
import {App, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthServiceProvider} from "../../../../providers/auth-service/auth-service";
import {Common} from "../../../../providers/common/common";
import {UserMainProvider} from "../../../../providers/user/main";
import {BusinessPaymentsCreatePage} from "./create/payments_create";

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-payments-types',
  templateUrl: 'payments_types.html',
})
export class BusinessPaymentsTypesPage {
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
              public viewCtrl: ViewController,
              public userMainService: UserMainProvider) {
  }

  ngOnInit() {
    this.checkAuth(() => {
      this.getBusinessPaymentsTypesList();
    });
  }
  dismiss(change = false) {
    this.viewCtrl.dismiss({change: change});
  }
  getBusinessPaymentsTypesList(complete = () => {}) {
    this.userMainService.getBusinessPaymentsTypesList(this.token).then((result) => {
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
  openTypeInfo(id, type) {
    let modal = this.modalCtrl.create(
      BusinessPaymentsCreatePage, {
        id: id,
        type: type,
        parent: this
      });
    modal.present();
  }

}

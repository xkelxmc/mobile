import { Component } from '@angular/core';
import {App, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../../providers/auth-service/auth-service";
import {Common} from "../../../providers/common/common";
import {UserMainProvider} from "../../../providers/user/main";
import {BusinessPaymentsTypesPage} from "./types/payments_types";

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-payments',
  templateUrl: 'payments.html',
})
export class BusinessPaymentsPage {
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
              public userMainService: UserMainProvider) {
  }

  ngOnInit() {
    this.checkAuth(() => {
      this.getBusinessPaymentsTypes();
    });
  }
  getBusinessPaymentsTypes(complete = () => {}) {
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
    this.getBusinessPaymentsTypes(() => refresher.complete());
  }

  add_payments(id, type) {
    let modal = this.modalCtrl.create(
      BusinessPaymentsTypesPage, {
        id: id,
        type: type
      });
    modal.onDidDismiss(data => {
      if(data && data.change){
        this.common.presentLoading();
        this.getBusinessPaymentsTypes(() => this.common.closeLoading());
      }
    });
    modal.present();
  }
}

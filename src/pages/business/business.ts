import { Component } from '@angular/core';
import {App, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Common} from "../../providers/common/common";
import {UserMainProvider} from "../../providers/user/main";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {BusinessPaymentsPage} from "./payments/payments";
import {BusinessPaymentsCashOutModal} from "./payments/cash_out/payments_cash_out";

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
  userAuth: boolean;
  userData: any;
  userInfo: any;
  token: string;

  currentPage: string = "fina";

  moneyList: any;
  showAllMoney: boolean = false;
  showAllMoneyBtn: boolean = true;

  limitMoney: number = 10;
  countMoney: number;

  paymentsList: any;
  showAllPayments: boolean = false;
  showAllPaymentsBtn: boolean = true;

  limitPayments: number = 10;
  countPayments: number;
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
      this.getUserInfo();
      this.getBusinessMoney(this.limitMoney, 0);
      this.getBusinessPayments(this.limitPayments, 0);
    });
  }
  getBusinessPayments(limit, offset, complete = () => {}){
    this.userMainService.getBusinessPayments(this.token, limit, offset).then((result: any) => {
      if (offset > 0) {
        if (result && result.data) {
          this.countPayments += result.data.length;
          for (let i = 0; i < result.data.length; i++) {
            this.paymentsList.data.push(result.data[i]);
          }
          if (result.data.length == 0) {
            this.showAllPayments = false;
          }
        } else {
          this.showAllPayments = false;

        }
      } else {
        this.paymentsList = result;
        if (this.paymentsList && this.paymentsList.data) {
          this.countPayments = this.paymentsList.data.length;
        }
      }
      complete();
    }, (err) => {
      this.paymentsList = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }
  getBusinessMoney(limit, offset, complete = () => {}) {
    this.userMainService.getBusinessMoney(this.token, limit, offset).then((result: any) => {
      if (offset > 0) {
        if (result && result.data) {
          this.countMoney += result.data.length;
          for (let i = 0; i < result.data.length; i++) {
            this.moneyList.data.push(result.data[i]);
          }
          if (result.data.length == 0) {
            this.showAllMoney = false;
          }
        } else {
          this.showAllMoney = false;

        }
      } else {
        this.moneyList = result;
        if (this.moneyList && this.moneyList.data) {
          this.countMoney = this.moneyList.data.length;
        }
      }
      complete();
    }, (err) => {
      this.moneyList = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
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
    this.getUserInfo();
    this.getBusinessPayments(this.limitPayments, 0);
    this.getBusinessMoney(this.countMoney, 0, () => refresher.complete());
  }
  getUserInfo(complete = () => {
  }) {
    this.userMainService.getUserInfo(this.token).then((result) => {
      this.userInfo = result;
      complete();
    }, (err) => {
      this.userInfo = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }
  doRefreshPayments(refresher) {
    this.getBusinessPayments(this.countPayments, 0, () => refresher.complete());
  }
  getAllHistoryPayments() {
    this.showAllPayments = true;
    this.showAllPaymentsBtn = false;
    this.doInfinitePayments();
  }
  doInfinitePayments(infiniteScroll = null) {
    setTimeout(() => {
      this.getBusinessMoney(10, this.countPayments, () => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
    }, 500);
  }

  getAllHistory() {
    this.showAllMoney = true;
    this.showAllMoneyBtn = false;
    this.doInfinite();
  }
  doInfinite(infiniteScroll = null) {
    setTimeout(() => {
      this.getBusinessMoney(10, this.countMoney, () => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
    }, 500);
  }

  openTypeInfo() {
    let modal = this.modalCtrl.create(BusinessPaymentsCashOutModal);
    modal.onDidDismiss(data => {
      if(data && data.change){
        this.common.presentLoading();
        this.getBusinessMoney(this.countMoney, 0);
        this.getBusinessPayments(this.limitMoney, 0,() => this.common.closeLoading());
      }
    });
    modal.present();
  }


  payments_list() {
    this.navCtrl.push(BusinessPaymentsPage);
  }
}

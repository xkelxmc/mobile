import {Component} from '@angular/core';
import {App, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup";
import {WelcomePage} from "../welcome/welcome";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {BonusProvider} from "../../providers/user/bonus";
import {SubscriptionsPage} from "./subscriptions/subscriptions";
import {UserMainProvider} from "../../providers/user/main";
import {CertificatesPage} from "./certificates/certificates";
import {PromocodesPage} from "./promocodes/promocodes";
import {BuysProvider} from "../../providers/user/buys";
import {BuysItemInfoPage} from "./buys/buys-item-info";
import {Common} from "../../providers/common/common";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  userAuth: boolean;
  userPhoto: string;
  userData: any;
  userInfo: any;
  token: string;
  userBonus: any;
  userBuys: any;

  limitBuys: number = 5;
  completeRef: number = 0;
  countBuys: number;
  showAllBuys: boolean = false;
  showAllBuysBtn: boolean = true;

  constructor(public navCtrl: NavController,
              public app: App,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public bonusService: BonusProvider,
              public buysService: BuysProvider,
              public modalCtrl: ModalController,
              public common: Common,
              public userMainService: UserMainProvider) {

  }

  ngOnInit() {
    this.checkAuth(() => {
      this.getBonus();
      this.getBuys(this.limitBuys, 0);
      this.getUserInfo();
    });
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
  checkAuth(callback) {
    this.userData = this.authService.getUserData();
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }

  getBonus(complete = () => {}) {
    this.bonusService.getBonus(this.token).then((result) => {
      this.userBonus = result;
      complete();
    }, (err) => {
      this.userBonus = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

  getBuys(limit, offset, complete = () => {}) {
    this.buysService.getBuys(this.token, limit, offset).then((result: any) => {
      if (offset > 0) {
        if (result && result.data) {
          this.countBuys += result.data.length;
          for (let i = 0; i < result.data.length; i++) {
            this.userBuys.data.push(result.data[i]);
          }
          if (result.data.length == 0) {
            this.showAllBuys = false;
          }
        } else {
          this.showAllBuys = false;

        }
      } else {
        this.userBuys = result;
        if (this.userBuys && this.userBuys.data) {
          this.countBuys = this.userBuys.data.length;
        }
      }
      complete();
    }, (err) => {
      this.userBuys = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }

  checkComplete(refresher) {
    if (this.completeRef == 3) {
      refresher.complete();
    }
  }

  doRefresh(refresher) {
    this.completeRef = 0;
    this.getUserInfo(() => {this.completeRef++;this.checkComplete(refresher);});
    this.getBuys(this.countBuys, 0, () => {this.completeRef++;this.checkComplete(refresher);});
    this.getBonus(() => {this.completeRef++;this.checkComplete(refresher);});
  }

  getAllBuys() {
    this.showAllBuys = true;
    this.showAllBuysBtn = false;
    this.doInfinite();
  }

  doInfinite(infiniteScroll = null) {
    setTimeout(() => {
      this.getBuys(10, this.countBuys, () =>{
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      });
    }, 500);
  }

  openBuyInfo(id) {
    let modal = this.modalCtrl.create(
      BuysItemInfoPage, {
        id: id
      });
    modal.onDidDismiss(data => {
      if(data.change){
        this.common.presentLoading();
        this.getBuys(this.countBuys, 0, () => this.common.closeLoading());
      }
    });
    modal.present();
  }

  backToWelcome() {
    this.app.getRootNav().push(WelcomePage);
  }

  login() {
    this.app.getRootNav().push(LoginPage);
  }

  signup() {
    this.app.getRootNav().push(SignupPage);
  }

  logout() {
    this.authService.clearUserData();
    this.userAuth = this.authService.isAuth();
    this.backToWelcome();
  }

  subscriptions() {
    this.navCtrl.push(SubscriptionsPage);
  }

  certificates() {
    this.navCtrl.push(CertificatesPage);
  }

  promocodes() {
    this.navCtrl.push(PromocodesPage);
  }
}

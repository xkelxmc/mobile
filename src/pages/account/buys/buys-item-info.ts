import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {OnRatingChangeEven} from "angular-star-rating";
import {BuyStaffListPage} from "./staff/buy-staff-list";
import {BuysProvider} from "../../../providers/user/buys";
import {AuthServiceProvider} from "../../../providers/auth-service/auth-service";
import {Common} from "../../../providers/common/common";

@Component({
  selector: 'buys-item-info',
  templateUrl: 'buys-item-info.html',
})
export class BuysItemInfoPage {
  token: string;
  userAuth: boolean;
  buyID: number;
  buyInfo: any;

  buyRatingSending: boolean = false;

  userData = {"text": "", "rating": 0};
  readOnluRating: boolean = true;
  rating: number = 0;
  label: string = 'Оцените качество обслуживания';
  header: string = 'Ваша покупка';
  onRatingChangeResult: OnRatingChangeEven;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams,
              public buysService: BuysProvider,
              public authService: AuthServiceProvider,
              public alertCtrl: AlertController,
              public common: Common,
              public viewCtrl: ViewController) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.buyID = this.navParams.data.id;

      this.checkAuth(()=>{
        this.getBuysItem();
      });
    } else {
      this.viewCtrl.dismiss({id: 0});
    }
  }

  checkAuth(callback = () => {}) {
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
  getBuysItem(complete = () => {}){
    this.buysService.getBuysItem(this.token, this.buyID).then((result:any) => {
      this.buyInfo = result.data;
      if ( this.buyInfo && this.buyInfo.rating) {
        this.rating = this.buyInfo.rating;
        this.readOnluRating = true;
        this.label = 'Ваша оценка';
        this.header = 'Ваш отзыв';
      } else if (this.buyInfo.can_review == 1) {
        this.readOnluRating = false;
        this.header = 'Оставьте отзыв';
      }
      complete();
    }, (err) => {
      complete();
    });
  }
  setBuyRating(complete = () => {}) {
    this.buysService.setBuyRating(this.token, this.buyID, this.userData.rating, this.userData.text).then((result: any) => {
      if (result && result.status == 'error') {
        let alert = this.alertCtrl.create({
          title: result.events[0].title,
          subTitle: result.events[0].text,
          buttons: ['OK']
        });
        alert.present();
      }
      complete();
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: 'Не удалось установить связь с сервером',
        buttons: ['OK']
      });
      alert.present();
      complete();
    });
  }

  onRatingChange = ($event: OnRatingChangeEven) => {
    this.onRatingChangeResult = $event;
    this.userData.rating = $event.rating;
  };

  goToStaffList() {
    this.navCtrl.push(BuyStaffListPage, {id: this.buyID, buy: this.buyInfo, parent: this});
  }

  submitReviews() {
    this.buyRatingSending = true;
    this.common.presentLoading();
    this.setBuyRating(() => {
      this.common.closeLoading();
      if (this.buyInfo.staff > 0) {
        this.goToStaffList();
      } else {
        this.dismiss();
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss({change: this.buyRatingSending});
  }
}

import { Component } from '@angular/core';
import {AlertController, NavParams, Platform, ViewController} from 'ionic-angular';
import {OnRatingChangeEven} from "angular-star-rating";
import {AuthServiceProvider} from "../../../../../providers/auth-service/auth-service";
import {BuysProvider} from "../../../../../providers/user/buys";
import {Common} from "../../../../../providers/common/common";

@Component({
  selector: 'buy-staff-item',
  templateUrl: 'buy-staff-item.html',
})
export class BuyStaffItemPage {
  token: string;
  staffID: number;
  userAuth: boolean;
  staff: any;
  buyInfo: any;
  parent: any;

  namr: string = 'name';
  userData = {"text": "","rating": 0};
  readOnluRating: boolean = true;
  buyRatingSending: boolean = false;
  rating: number = 0;
  label: string = 'Оцените качество обслуживания';
  header: string = 'Ваша покупка';
  onRatingChangeResult:OnRatingChangeEven;
  constructor(
    public platform: Platform,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public buysService: BuysProvider,
    public alertCtrl: AlertController,
    public common: Common,
    public viewCtrl: ViewController) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.staffID = this.navParams.data.id;
      this.staff = this.navParams.data.staff;
      this.buyInfo = this.navParams.data.buy;
      if (this.staff.rating) {
        this.rating = this.staff.rating;
        this.readOnluRating = true;
        this.label = 'Ваша оценка';
        this.header = 'Ваш отзыв';
      } else if (this.buyInfo.can_review == 1) {
        this.readOnluRating = false;
        this.header = 'Оставьте отзыв';
      }
      this.checkAuth();
    }else{
      this.viewCtrl.dismiss();
    }
  }

  checkAuth(callback = () => {}) {
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }

  onRatingChange = ($event:OnRatingChangeEven) => {
    this.onRatingChangeResult = $event;
    this.userData.rating = $event.rating;
  };

  setBuyStaffRating(complete = () => {}) {
    this.buysService.setBuyStaffRating(this.token, this.buyInfo.id, this.staff.id, this.userData.rating, this.userData.text).then((result: any) => {
      this.common.closeLoading();
      if (result && result.status == 'error') {
        let alert = this.alertCtrl.create({
          title: result.events[0].title,
          subTitle: result.events[0].text,
          buttons: ['OK']
        });
        alert.present();
      }else{
        this.buyRatingSending = true;
        this.dismiss();
      }
      complete();
    }, (err) => {
      this.common.closeLoading();
      let alert = this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: 'Не удалось установить связь с сервером',
        buttons: ['OK']
      });
      alert.present();
      complete();
    });
  }

  submitReviews(){
    this.common.presentLoading();
    this.setBuyStaffRating();
  }

  dismiss() {
    this.viewCtrl.dismiss({change: this.buyRatingSending});
  }
}

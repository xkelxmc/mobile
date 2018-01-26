import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthServiceProvider} from "../../../../../providers/auth-service/auth-service";
import {Common} from "../../../../../providers/common/common";
import {UserMainProvider} from "../../../../../providers/user/main";
import {BusinessPaymentsCashOutCheckModal} from "./check/payments_cash_out_check";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-payments-enter-data',
  templateUrl: 'payments_enter_data.html',
})
export class BusinessPaymentsEnterDataModel {
  userAuth: boolean;
  userData: any;
  token: string;
  typeID: number;
  paymentID: number;
  userInfo: any;
  typeInfo: any;

  parent: any;

  summ = '';
  checkForm: FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthServiceProvider,
              public common: Common,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public userMainService: UserMainProvider,
              public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.typeID = this.navParams.data.id;
      this.typeInfo = this.navParams.data.type;
      this.parent = this.navParams.data.parent;
      this.checkAuth(()=>{
        this.getUserInfo(()=>{
          this.checkForm = this.formBuilder.group({
            money: ['', Validators.compose([Validators.min(this.typeInfo.type_start_price), Validators.max(this.userInfo.data.money), Validators.required])],
          });
        });
      });
    } else {
      this.dismiss(false);
    }
  }
  getUserInfo(complete = () => {
  }) {
    this.userMainService.getUserInfo(this.token).then((result:any) => {
      this.userInfo = result;
      complete();
    }, (err) => {
      this.userInfo = {"status": "error", "events": [{"text": "Невозможно получить данные"}]};
      complete();
    });
  }
  dismiss(change = false) {
    this.viewCtrl.dismiss({change: change});
    this.parent.viewCtrl.dismiss({change: change});
  }

  checkAuth(callback = () => {}) {
    this.userData = this.authService.getUserData();
    this.userAuth = this.authService.isAuth();
    this.token = this.authService.getToken();
    callback();
  }
  openCheckKey() {
    let modal = this.modalCtrl.create(
      BusinessPaymentsCashOutCheckModal, {
        id: this.typeID,
        parent: this
      });
    modal.present();
  }

  createPayment(completeS = () => {}, complete_error = () => {}) {
    this.userMainService.getBusinessPaymentsCashOut(this.token, this.typeID, this.summ).then((result: any) => {
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
      this.openCheckKey();
    },() => {
      this.common.closeLoading();
    });
  }
}
